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

const fetchSpecificUserData = async (userUid) => {
  const res = await getDoc(userDocumentRef(userUid));
  return res.data();
};

export const fetchAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.POSTS_FETCH_REQUEST });

    const q = query(
      postsCollectionRef(),
      orderBy("timestamp", "desc"),

      limit(2)
    );

    const querySnapshot = await getDocs(q);

    let items = [];
    querySnapshot.docs.forEach(async (eachDoc) => {
      const idRef = eachDoc.data().createdBy;
      const userResult = await fetchSpecificUserData(idRef);
      items.push({
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.displayName,
          photoURL: userResult.photoURL,
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
    const data = await fetchSpecificUserData(uid);
    dispatch({ type: Constants.SELECTED_USER_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedPosts = (uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.SELECTED_USER_POSTS_REQUEST });

    const q = query(
      postsCollectionRef(),
      where("createdBy", "==", `${uid}`),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.docs.forEach(async (eachDoc) => {
      const idRef = eachDoc.data().createdBy;
      const userResult = await fetchSpecificUserData(idRef);
      items.push({
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.displayName,
          photoURL: userResult.photoURL,
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
    const idRef = res.data().createdBy;
    const userResult = await fetchSpecificUserData(idRef);
    let allData = {
      ...res.data(),
      createdBy: {
        uid: res.data().createdBy,
        displayName: userResult.displayName,
        photoURL: userResult.photoURL,
      },
      timestamp: res.data().timestamp.toDate().toDateString(),
      id: res.id,
    };

    dispatch({ type: Constants.SELECTED_POST_FETCH_SUCCESS, payload: allData });
  } catch (error) {
    console.log(error);
  }
};
