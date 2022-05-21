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
import {
  auth,
  userDocumentRef,
  postDocumentRef,
} from "../../firebase/firebase";
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

    await setDoc(userRef, {
      displayName,
      email,
      uid,
      photoURL,
    });

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

export const fetchUser = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { displayName, email, uid, photoURL } = user;
      dispatch({
        type: Constants.USER_SIGNIN_SUCCESS,
        payload: { displayName, email, uid, photoURL },
      });
    } else {
      dispatch({
        type: Constants.USER_SIGNIN_SUCCESS,
        payload: null,
      });
    }
  });
};

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch({
    type: Constants.USER_SIGNOUT,
  });
  // setUser();

  dispatch({ type: Constants.USER_SIGNOUT });
};

export const toggleUserFollow =
  (followerId, followeeId) => async (dispatch, getState) => {
    const followerDoc = await getDoc(userDocumentRef(followerId));
    const followeeDoc = await getDoc(userDocumentRef(followeeId));
    const FollowerUserArray = followerDoc.data().followers.includes(followerId);
    const FolloweeUserArray = followeeDoc.data().followers.includes(followeeId);
    if (followerDoc.data())
      if (FollowerUserArray) {
        await updateDoc(userDocumentRef(followerId), {
          followers: arrayRemove(followerId),
        });
      } else {
        await updateDoc(userDocumentRef(followerId), {
          followers: arrayUnion(followerId),
        });
      }

    if (FolloweeUserArray) {
      await updateDoc(userDocumentRef(followeeId), {
        followers: arrayRemove(followeeId),
      });
    } else {
      await updateDoc(userDocumentRef(followeeId), {
        followers: arrayUnion(followeeId),
      });
    }
  };
