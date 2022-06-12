import {
  addDoc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  commentsCollectionRef,
  commentsDocumentRef,
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

    if (querySnapshot.docs.length > 0) {
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
          payload: [...data],
        });
      });
    } else {
      dispatch({
        type: Constants.FETCH_COMMENTS_OF_POST_FAIL,
        payload: { message: "Be the first to say something." },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createComment =
  (postId, userId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: Constants.CREATE_COMMENTS_REQUEST });

      await addDoc(commentsCollectionRef(), {
        createdBy: userId,
        postId,
        description: comment,
        timestamp: serverTimestamp(),
      });
      dispatch({ type: Constants.CREATE_COMMENTS_SUCCESS });
      dispatch(fetchCommentsOfPost(postId));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteComment =
  (commentId, createdByUid, postId) => async (dispatch, getState) => {
    try {
      dispatch({ type: Constants.DELETE_COMMENTS_REQUEST });

      const commentRef = commentsDocumentRef(commentId);
      await deleteDoc(commentRef);
      dispatch({
        type: Constants.DELETE_COMMENTS_SUCCESS,
        payload: { success: true, message: "Comment Deleted Succesfully!" },
      });
      dispatch(fetchCommentsOfPost(postId));
    } catch (error) {
      console.log(error);
    }
  };
