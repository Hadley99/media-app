import Login from "./routes/Login";
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

import Profile from "./routes/Profile";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import SinglePost from "./components/singlePost/SinglePost";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box sx={{}} className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/post/:postid" element={<SinglePost />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
