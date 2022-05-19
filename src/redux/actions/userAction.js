import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
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
    const userRef = userDocumentRef(data.user.uid);

    await setDoc(userRef, { displayName, email, uid, photoURL });

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
