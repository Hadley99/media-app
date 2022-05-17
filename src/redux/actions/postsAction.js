import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Constants } from "../constants/constants";
import { postsCollectionRef, storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { async } from "@firebase/util";

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Constants.POSTS_FETCH_REQUEST });
    let userData;
    let userDocRef;
    let userResult;
    let changes;
    let idToReplace;
    const collectionRef = postsCollectionRef();
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    //  const unmount = onSnapshot(q, (querySnapshot) => {
    let items = [];

    querySnapshot.docs.forEach(async (eachDoc) => {
      userData = eachDoc.data().createdBy;
      userDocRef = doc(db, "users", `${userData}`);
      userResult = await getDoc(userDocRef);

      items.push({
        ...eachDoc.data(),
        createdBy: {
          displayName: userResult.data().displayName,
          photoURL: userResult.data().photoURL,
        },
        timestamp: eachDoc.data().timestamp.toDate().toDateString(),
        id: eachDoc.id,
      });
      dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: items });
    });

    // onSnapshot(q, (querySnapshot) => {
    //   console.log("--------------");
    //   querySnapshot.docChanges().forEach((change) => {
    //     console.log(change.doc.data(), change.doc.id);
    //     // if (change.type === "added") {
    //     //   console.log("New ", change.doc.data());
    //     // }
    //     if (change.type === "modified") {
    //       // idToReplace = items.findIndex((item) => item.id === change.doc.id);
    //       // items[idToReplace].likedBy = change.doc.data().likedBy;
    //       // console.log(idToReplace);
    //       // dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: items });
    //     }
    //     // if (change.type === "removed") {
    //     //   console.log("Removed  ", change.doc.data());
    //     // }
    //   });
    // });
    // });
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

    const postRef = collection(db, "posts");

    if (tempImg == null) return;

    const imageRef = ref(storage, `images/${uid}/${tempImg.name + v4()}`);
    await uploadBytes(imageRef, tempImg);
    const imageUrl = await getDownloadURL(imageRef);

    let res = await addDoc(postRef, {
      image: imageUrl,
      description: description,
      createdBy: uid,
      likedBy: [],
      timestamp: serverTimestamp(),
    });

    dispatch({ type: Constants.POSTS_CREATE_SUCCESS });
    dispatch(fetchPosts());
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

    const docRef = doc(db, "posts", `${id}`);
    const res = await getDoc(docRef);
    const likedUsersArray = res.data().likedBy.includes(uid);
    console.log(likedUsersArray);
    let updatedPosts = [...posts];
    let idToReplace = updatedPosts.findIndex((item) => item.id === id);
    if (likedUsersArray) {
      await updateDoc(docRef, {
        likedBy: arrayRemove(uid),
      });
      updatedPosts[idToReplace].likedBy = updatedPosts[
        idToReplace
      ].likedBy.filter((id) => id !== uid);
    } else {
      await updateDoc(docRef, {
        likedBy: arrayUnion(uid),
      });
      updatedPosts[idToReplace].likedBy.push(uid);
    }
    dispatch({ type: Constants.POSTS_FETCH_SUCCESS, payload: updatedPosts });
    dispatch({ type: Constants.POSTS_LIKE_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};
