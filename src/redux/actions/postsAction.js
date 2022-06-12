import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Constants } from "../constants/constants";
import {
  commentsCollectionRef,
  commentsDocumentRef,
  db,
  postDocumentRef,
  postsCollectionRef,
  storage,
} from "../../firebase/firebase";
import { v4 } from "uuid";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { fetchAllPosts } from "./fetchActions";

export const createPost =
  (tempImg, description) => async (dispatch, getState) => {
    if (tempImg == null) {
      return; // dispatch({ type: Constants.POSTS_CREATE_FAIL, payload: {} });
    }
    dispatch({ type: Constants.POSTS_CREATE_REQUEST });
    const {
      userSignin: {
        user: { uid },
      },
    } = getState();

    const imageRef = ref(storage, `images/${uid}/${tempImg.name + v4()}`);
    await uploadBytes(imageRef, tempImg);

    const imageUrl = await getDownloadURL(imageRef);

    let res = await addDoc(postsCollectionRef(), {
      image: imageUrl,
      description: description,
      createdBy: uid,
      likedBy: [],
      timestamp: serverTimestamp(),
    });

    dispatch({ type: Constants.POSTS_CREATE_SUCCESS });
    dispatch(fetchAllPosts());
  };

export const deletePost = (id, createdBy) => async (dispatch, getState) => {
  const {
    userSignin: {
      user: { uid },
    },
    fetchPost: { posts },
  } = getState();

  try {
    dispatch({ type: Constants.POSTS_DELETE_REQUEST });
    if (uid === createdBy) {
      const postRef = postDocumentRef(id);
      const batch = writeBatch(db);

      let copyOfPosts = [...posts];
      let filteredArray = copyOfPosts.filter((post) => post.id !== id);

      dispatch({
        type: Constants.POSTS_DELETE_SUCCESS,
        payload: { success: true, message: "Post Deleted Succesfully!" },
      });
      dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: filteredArray });

      //Deleting comments in firestore db
      const q = query(commentsCollectionRef(), where("postId", "==", `${id}`));
      const queryResult = await getDocs(q);
      queryResult.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      await deleteDoc(postRef);
    } else {
      dispatch({
        type: Constants.POSTS_DELETE_FAIL,
        payload: { message: "You are not authorized to delete this post" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleLike = (id) => async (dispatch, getState) => {
  const {
    userSignin: {
      user: { uid },
    },
    fetchPost: { posts },
    selectedPost: { post },
  } = getState();

  try {
    dispatch({ type: Constants.POSTS_LIKE_REQUEST });

    const res = await getDoc(postDocumentRef(id));

    const likedUsersArray = res.data().likedBy.includes(uid);
    let updatedPosts = [...posts];

    let indexOfIdToReplace = updatedPosts.findIndex((item) => item.id === id);

    if (likedUsersArray) {
      if (post) {
        let copyOfSelectedPost = { ...post };
        copyOfSelectedPost.likedBy = copyOfSelectedPost.likedBy.filter(
          (id) => id !== uid
        );

        dispatch({
          type: Constants.POSTS_LIKE_SUCCESS,
        });
        dispatch({
          type: Constants.SELECTED_POST_FETCH_SUCCESS,
          payload: { ...copyOfSelectedPost },
        });
      }
      updatedPosts[indexOfIdToReplace].likedBy = updatedPosts[
        indexOfIdToReplace
      ].likedBy.filter((id) => id !== uid);
      dispatch({ type: Constants.POSTS_LIKE_SUCCESS });

      dispatch({
        type: Constants.POSTS_FETCH_SUCCESS,
        payload: updatedPosts,
      });
      await updateDoc(postDocumentRef(id), {
        likedBy: arrayRemove(uid),
      });
    } else {
      if (post) {
        let copyOfSelectedPost = { ...post };
        copyOfSelectedPost.likedBy.push(uid);

        dispatch({
          type: Constants.POSTS_LIKE_SUCCESS,
        });
        dispatch({
          type: Constants.SELECTED_POST_FETCH_SUCCESS,
          payload: { ...copyOfSelectedPost },
        });
      }
      updatedPosts[indexOfIdToReplace].likedBy.push(uid);
      dispatch({ type: Constants.POSTS_LIKE_SUCCESS });
      dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: updatedPosts });
      await updateDoc(postDocumentRef(id), {
        likedBy: arrayUnion(uid),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
