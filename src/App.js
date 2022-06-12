import Login from "./routes/Login";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./routes/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/userAction";
import Profile from "./routes/Profile";
import SinglePost from "./components/singlePost/SinglePost";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth, userDocumentRef } from "./firebase/firebase";
import { Constants } from "./redux/constants/constants";
import { getDoc } from "firebase/firestore";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = userDocumentRef(user.uid);
        const currentUserFromDb = await getDoc(docRef);
        dispatch({
          type: Constants.USER_SIGNIN_SUCCESS,
          payload: {
            displayName: currentUserFromDb.data()?.displayName,
            email: currentUserFromDb.data()?.email,
            uid: currentUserFromDb.data()?.uid,
            photoURL: currentUserFromDb.data()?.photoURL,
            followers: currentUserFromDb.data()?.followers,
            following: currentUserFromDb.data()?.following,
          },
        });
      } else {
        dispatch({
          type: Constants.USER_SIGNIN_SUCCESS,
          payload: null,
        });
      }
    });
    //  dispatch(fetchUser());
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthenticatedRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="/post/:postid" element={<SinglePost />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
