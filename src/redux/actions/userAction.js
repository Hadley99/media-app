import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { auth, userDocumentRef } from "../../firebase/firebase";
import { Constants } from "../constants/constants";

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: Constants.USER_SIGNIN_REQUEST });
    const googleProvider = new GoogleAuthProvider();

    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    const data = await signInWithPopup(auth, googleProvider);

    const { displayName, email, uid, photoURL } = data.user;
    const userRef = userDocumentRef(uid);
    const userDoc = await getDoc(userDocumentRef(uid));
    if (userDoc.exists()) {
    } else {
      await setDoc(
        userRef,
        {
          displayName,
          email,
          uid,
          photoURL,
          followers: [],
          following: [],
        },
        { merge: true }
      );
    }

    dispatch({
      type: Constants.USER_SIGNIN_SUCCESS,
      payload: { displayName, email, uid, photoURL },
    });
  } catch (error) {
    dispatch({
      type: Constants.USER_SIGNIN_FAIL,
      payload: { code: error.code, message: error.message },
    });
  }
};

// export const fetchUser = () => (dispatch) => {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const { displayName, email, uid, photoURL } = user;
//       dispatch({
//         type: Constants.USER_SIGNIN_SUCCESS,
//         payload: { displayName, email, uid, photoURL },
//       });
//     } else {
//       dispatch({
//         type: Constants.USER_SIGNIN_SUCCESS,
//         payload: null,
//       });
//     }
//   });
// };

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch({
    type: Constants.USER_SIGNOUT,
  });

  dispatch({ type: Constants.USER_SIGNOUT });
};

export const toggleUserFollow =
  (onPageUserId, currentUserId) => async (dispatch, getState) => {
    try {
      dispatch({ type: Constants.USER_FOLLOWERS_REQUEST });
      const {
        userSignin: { user: currentUser },

        selectedUser: { user },
      } = getState();
      const onPageUserDoc = await getDoc(userDocumentRef(onPageUserId));
      const currentUserDoc = await getDoc(userDocumentRef(currentUserId));
      const isFollowerInUserArray = onPageUserDoc
        .data()
        .followers.includes(currentUserId);
      const isFolloweeInUserArray = currentUserDoc
        .data()
        .following.includes(onPageUserId);
      let copyOfCurrentUser = JSON.parse(JSON.stringify(currentUser));
      let copyOfSelectedUser = JSON.parse(JSON.stringify(user));

      if (isFollowerInUserArray) {
        copyOfSelectedUser.followers = copyOfSelectedUser.followers.filter(
          (id) => id !== currentUserId
        );
        dispatch({
          type: Constants.USER_FOLLOWERS_SUCCESS,
        });

        dispatch({
          type: Constants.SELECTED_USER_FETCH_SUCCESS,
          payload: copyOfSelectedUser,
        });
        await updateDoc(userDocumentRef(onPageUserId), {
          followers: arrayRemove(currentUserId),
        });
      } else {
        copyOfSelectedUser.followers = [
          ...copyOfSelectedUser.followers,
          currentUserId,
        ];

        dispatch({
          type: Constants.USER_FOLLOWERS_SUCCESS,
        });
        dispatch({
          type: Constants.SELECTED_USER_FETCH_SUCCESS,
          payload: copyOfSelectedUser,
        });

        await updateDoc(userDocumentRef(onPageUserId), {
          followers: arrayUnion(currentUserId),
        });
      }

      if (isFolloweeInUserArray) {
        copyOfCurrentUser.following = copyOfCurrentUser.following.filter(
          (id) => id !== onPageUserId
        );
        dispatch({ type: Constants.USER_FOLLOWERS_SUCCESS });

        dispatch({
          type: Constants.USER_SIGNIN_SUCCESS,
          payload: copyOfCurrentUser,
        });
        await updateDoc(userDocumentRef(currentUserId), {
          following: arrayRemove(onPageUserId),
        });
      } else {
        copyOfCurrentUser.following = [
          ...copyOfCurrentUser.followers,
          currentUserId,
        ];

        dispatch({ type: Constants.USER_FOLLOWERS_SUCCESS });

        dispatch({
          type: Constants.USER_SIGNIN_SUCCESS,
          payload: copyOfCurrentUser,
        });
        await updateDoc(userDocumentRef(currentUserId), {
          following: arrayUnion(onPageUserId),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
