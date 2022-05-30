import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/actions/userAction";
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const signInWithGoogle = () => {
    dispatch(login());
  };

  return (
    <Box sx={{ mt: 8, pt: 2 }}>
      <Container maxWidth="md">
        <GoogleButton onClick={signInWithGoogle} />
        {user && (
          <div>
            name: {user.displayName} <br />
            email: {user.email} <br />
            uid: {user.uid} <br />
            Photo: <img src={user.photoURL} alt={user.displayName} />
          </div>
        )}
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
    </Box>
  );
};

export default Login;
