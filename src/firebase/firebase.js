// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADM1qIfpJsbJKiy5qwa4OmFkWgvBPtNnU",
  authDomain: "social-media-app-9e505.firebaseapp.com",
  projectId: "social-media-app-9e505",
  storageBucket: "social-media-app-9e505.appspot.com",
  messagingSenderId: "202363574542",
  appId: "1:202363574542:web:cb5cdf788d59f4905b1f5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const postsCollectionRef = () => collection(db, "posts");
