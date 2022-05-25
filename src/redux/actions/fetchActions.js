import {
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  db,
  postDocumentRef,
  postsCollectionRef,
  userDocumentRef,
} from "../../firebase/firebase";
import { Constants } from "../constants/constants";

export const fetchAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.POSTS_FETCH_REQUEST });
    let userData;
    let userDocRef;
    let userResult;

    const q = query(
      postsCollectionRef(),
      orderBy("timestamp", "desc"),

      limit(2)
    );

    const querySnapshot = await getDocs(q);

    let items = [];
    querySnapshot.docs.forEach(async (eachDoc) => {
      userData = eachDoc.data().createdBy;
      userDocRef = userDocumentRef(userData);
      userResult = await getDoc(userDocRef);

      items.push({
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.data().displayName,
          photoURL: userResult.data().photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      });
      dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: items });
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedUser = (uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.SELECTED_USER_FETCH_REQUEST });
    const res = await getDoc(userDocumentRef(uid));
    const data = res.data();

    dispatch({ type: Constants.SELECTED_USER_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedPosts = (uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.SELECTED_USER_POSTS_REQUEST });
    let userData;
    let userDocRef;
    let userResult;
    const q = query(
      postsCollectionRef(),
      where("createdBy", "==", `${uid}`),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.docs.forEach(async (eachDoc) => {
      userData = eachDoc.data().createdBy;
      userDocRef = userDocumentRef(userData);
      userResult = await getDoc(userDocRef);

      items.push({
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.data().displayName,
          photoURL: userResult.data().photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      });

      dispatch({ type: Constants.SELECTED_USER_POSTS_SUCCESS, payload: items });
    });
  } catch (error) {
    console.log(error);
  }
};
export const fetchSelectedPost = (postid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.SELECTED_POST_FETCH_REQUEST });
    const res = await getDoc(postDocumentRef(postid));
    const data = res.data();

    dispatch({ type: Constants.SELECTED_POST_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
