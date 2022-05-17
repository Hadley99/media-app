import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, login, logout } from "../redux/actions/userAction";
const GoogleAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const signInWithGoogle = () => {
    dispatch(login());
  };

  return (
    <div>
      <GoogleButton onClick={signInWithGoogle} />
      {user && (
        <div>
          name: {user.displayName} <br />
          email: {user.email} <br />
          uid: {user.uid} <br />
          Photo: <img src={user.photoURL} alt={user.displayName} />
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GoogleAuth;