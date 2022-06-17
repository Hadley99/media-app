import {
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  fetchSpecificUserData,
  postDocumentRef,
  postsCollectionRef,
} from "../../firebase/firebase";
import { Constants } from "../constants/constants";

export const fetchAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.POSTS_FETCH_REQUEST });

    const q = query(
      postsCollectionRef(),
      orderBy("timestamp", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);
    // console.log("lastDoc", querySnapshot);

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    // console.log("lastDoc", lastDoc);

    const items = querySnapshot.docs.map(async (eachDoc) => {
      const idRef = eachDoc.data().createdBy;
      const userResult = await fetchSpecificUserData(idRef);

      return {
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.displayName,
          photoURL: userResult.photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      };
    });

    const posts = await Promise.all(items);

    dispatch({
      type: Constants.POSTS_FETCH_SUCCESS,
      payload: {
        posts: [...posts],
        lastDoc: lastDoc,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadMoreData = () => async (dispatch, getState) => {
  const {
    fetchPost: { lastDoc: lastDocFromState },
  } = getState();
  try {
    const q = query(
      postsCollectionRef(),
      orderBy("timestamp", "desc"),
      startAfter(lastDocFromState),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    const items = querySnapshot.docs.map(async (eachDoc) => {
      const idRef = eachDoc.data().createdBy;
      const userResult = await fetchSpecificUserData(idRef);
      return {
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.displayName,
          photoURL: userResult.photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      };
    });

    const posts = await Promise.all(items);

    dispatch({
      type: Constants.POSTS_LOADMORE_SUCCESS,
      payload: { posts: posts, lastDoc: lastDoc },
    });
    if (querySnapshot.empty) {
      dispatch({
        type: Constants.POSTS_FETCH_FAIL,
        payload: { end: true, message: "You Have Reached The End" },
      });
    }
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

    if (querySnapshot.empty) {
      dispatch({
        type: Constants.SELECTED_USER_POSTS_FAIL,
        payload: { error: "You have no posts." },
      });
    } else {
      const items = querySnapshot.docs.map(async (eachDoc) => {
        const idRef = eachDoc.data().createdBy;
        const userResult = await fetchSpecificUserData(idRef);
        return {
          ...eachDoc.data(),
          createdBy: {
            uid: eachDoc.data().createdBy,
            displayName: userResult.displayName,
            photoURL: userResult.photoURL,
          },
          timestamp: eachDoc.data().timestamp.toDate().toDateString(),
          id: eachDoc.id,
        };
      });
      const post = await Promise.all(items);
      dispatch({ type: Constants.SELECTED_USER_POSTS_SUCCESS, payload: post });
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchSelectedPost = (postid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.SELECTED_POST_FETCH_REQUEST, payload: null });

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
