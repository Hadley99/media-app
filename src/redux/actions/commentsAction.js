import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  commentsCollectionRef,
  commentsDocRef,
  fetchSpecificUserData,
} from "../../firebase/firebase";
import { Constants } from "../constants/constants";

export const fetchCommentsOfPost = (postid) => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.FETCH_COMMENTS_OF_POST_REQUEST });
    const q = query(
      commentsCollectionRef(),
      where("postId", "==", `${postid}`),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.docs.forEach(async (eachDoc) => {
      const userIdRef = eachDoc.data().createdBy;
      const userResult = await fetchSpecificUserData(userIdRef);

      data.push({
        ...eachDoc.data(),
        createdBy: {
          uid: eachDoc.data().createdBy,
          displayName: userResult.displayName,
          photoURL: userResult.photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      });
      dispatch({
        type: Constants.FETCH_COMMENTS_OF_POST_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const createComment =
  (postId, userId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: Constants.FETCH_COMMENTS_OF_POST_REQUEST });
      if (!postId || !userId || !comment) {
        console.log("all fields are not full", postId, userId, comment);
        return;
      }
      await addDoc(commentsCollectionRef(), {
        createdBy: userId,
        postId,
        description: comment,
        timestamp: serverTimestamp(),
      });
      dispatch({ type: Constants.FETCH_COMMENTS_OF_POST_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };
