import {
  addDoc,
  deleteDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  commentsCollectionRef,
  commentsDocumentRef,
  fetchSpecificUserData,
  postDocumentRef,
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

    if (querySnapshot.docs.length > 0) {
      const items = querySnapshot.docs.map(async (eachDoc) => {
        const userIdRef = eachDoc.data().createdBy;
        const userResult = await fetchSpecificUserData(userIdRef);

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
      const allComments = await Promise.all(items);

      dispatch({
        type: Constants.FETCH_COMMENTS_OF_POST_SUCCESS,
        payload: [...allComments],
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
    if (comment === "") return;
    try {
      dispatch({ type: Constants.CREATE_COMMENTS_REQUEST });
      const trimmedComment = comment.trim();

      await updateDoc(postDocumentRef(postId), {
        commentsCount: increment(1),
      });
      await addDoc(commentsCollectionRef(), {
        createdBy: userId,
        postId,
        description: trimmedComment,
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
      await updateDoc(postDocumentRef(postId), {
        commentsCount: increment(-1),
      });
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
