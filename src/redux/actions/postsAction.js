import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Constants } from "../constants/constants";
import {
  commentsCollectionRef,
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

export const createPost = (file, description) => async (dispatch, getState) => {
  if (file == null) {
    dispatch({
      type: Constants.POSTS_CREATE_FAIL,
      payload: { error: "Please, upload an image" },
    });
    return;
  }
  try {
    dispatch({ type: Constants.POSTS_CREATE_REQUEST });
    const {
      userSignin: {
        user: { uid },
      },
    } = getState();

    const imageRef = ref(storage, `images/${uid}/${file.name + v4()}`);
    await uploadBytes(imageRef, file);

    const imageUrl = await getDownloadURL(imageRef);

    let res = await addDoc(postsCollectionRef(), {
      image: imageUrl,
      description: description,
      createdBy: uid,
      likedBy: [],
      commentsCount: 0,
      timestamp: serverTimestamp(),
    });

    dispatch({ type: Constants.POSTS_CREATE_SUCCESS });
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deletePost =
  (id, createdBy, imageUrl) => async (dispatch, getState) => {
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
        const storage = getStorage();
        const imageRef = ref(storage, imageUrl);

        //Deleting comments in firestore db
        const q = query(
          commentsCollectionRef(),
          where("postId", "==", `${id}`)
        );
        const queryResult = await getDocs(q);
        queryResult.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        await deleteDoc(postRef);
        await deleteObject(imageRef);

        dispatch({
          type: Constants.POSTS_DELETE_SUCCESS,
          payload: { success: true, message: "Post Deleted Succesfully!" },
        });
        dispatch(fetchAllPosts());
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
    let copyOfPosts;
    let indexOfIdToReplace;
    let copyOfSelectedPost;

    if (likedUsersArray) {
      //to remove existing like
      if (post) {
        copyOfSelectedPost = { ...post };
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

      if (posts) {
        copyOfPosts = [...posts];
        indexOfIdToReplace = copyOfPosts.findIndex((item) => item.id === id);
        copyOfPosts[indexOfIdToReplace].likedBy = copyOfPosts[
          indexOfIdToReplace
        ].likedBy.filter((id) => id !== uid);

        dispatch({ type: Constants.POSTS_LIKE_SUCCESS });
        dispatch({
          type: Constants.POSTS_FETCH_SUCCESS,
          payload: { posts: copyOfPosts },
        });
      }

      await updateDoc(postDocumentRef(id), {
        likedBy: arrayRemove(uid),
      });
    } else {
      //to add like
      if (post) {
        copyOfSelectedPost = { ...post };
        copyOfSelectedPost.likedBy.push(uid);

        dispatch({
          type: Constants.POSTS_LIKE_SUCCESS,
        });
        dispatch({
          type: Constants.SELECTED_POST_FETCH_SUCCESS,
          payload: { ...copyOfSelectedPost },
        });
      }
      if (posts) {
        copyOfPosts = [...posts];
        indexOfIdToReplace = copyOfPosts.findIndex((item) => item.id === id);
        copyOfPosts[indexOfIdToReplace].likedBy.push(uid);

        dispatch({ type: Constants.POSTS_LIKE_SUCCESS });
        dispatch({
          type: Constants.POSTS_FETCH_SUCCESS,
          payload: { posts: copyOfPosts },
        });
      }

      await updateDoc(postDocumentRef(id), {
        likedBy: arrayUnion(uid),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
