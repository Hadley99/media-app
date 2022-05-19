import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Constants } from "../constants/constants";
import {
  documentRef,
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
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.POSTS_FETCH_REQUEST });
    let userData;
    let userDocRef;
    let userResult;

    const q = query(postsCollectionRef(), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    let items = [];
    querySnapshot.docs.forEach(async (eachDoc) => {
      userData = eachDoc.data().createdBy;
      userDocRef = documentRef(db, "users", userData);
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

export const createPost =
  (tempImg, description) => async (dispatch, getState) => {
    dispatch({ type: Constants.POSTS_CREATE_REQUEST });
    const {
      userSignin: {
        user: { uid },
      },
    } = getState();

    if (tempImg == null) return;
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
    dispatch(fetchPosts());
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
    const postRef = documentRef(db, "posts", id);

    let filteredArray = posts.filter((post) => post.id !== id);
    if (uid === createdBy) {
      await deleteDoc(postRef);
      dispatch({ type: Constants.POSTS_DELETE_SUCCESS });
      dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: filteredArray });
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
  } = getState();

  try {
    dispatch({ type: Constants.POSTS_LIKE_REQUEST });

    const res = await getDoc(documentRef(db, "posts", id));

    const likedUsersArray = res.data().likedBy.includes(uid);
    let updatedPosts = [...posts];
    let idToReplace = updatedPosts.findIndex((item) => item.id === id);
    if (likedUsersArray) {
      updatedPosts[idToReplace].likedBy = updatedPosts[
        idToReplace
      ].likedBy.filter((id) => id !== uid);
      await updateDoc(documentRef(db, "posts", id), {
        likedBy: arrayRemove(uid),
      });
    } else {
      updatedPosts[idToReplace].likedBy.push(uid);
      await updateDoc(documentRef(db, "posts", id), {
        likedBy: arrayUnion(uid),
      });
    }
    dispatch({ type: Constants.POSTS_LIKE_SUCCESS });
    dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: updatedPosts });
  } catch (error) {
    console.log(error);
  }
};
