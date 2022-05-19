import GoogleAuth from "./components/GoogleAuth";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import Home from "./routes/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/userAction";
import { fetchAllPosts } from "./redux/actions/fetchActions";
import Profile from "./routes/Profile";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
