// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.FIREBASE_APPCHECK_DEBUG_TOKEN =
  process.env.REACT_APP_FIREBASE_DEBUG_TOKEN;
if (process.env) {
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      process.env.REACT_APP_FIREBASE_APP_CHECK
    ),
    isTokenAutoRefreshEnabled: true,
  });
}

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
//setPersistence(auth, browserSessionPersistence);

export const postsCollectionRef = () => collection(db, "posts");
export const commentsCollectionRef = () => collection(db, "comments");
export const userDocumentRef = (docId) => doc(db, "users", docId);
export const commentsDocumentRef = (docId) => doc(db, "comments", docId);
export const postDocumentRef = (docId) => doc(db, "posts", docId);

export const fetchSpecificUserData = async (userUid) => {
  const res = await getDoc(userDocumentRef(userUid));
  return res.data();
};
