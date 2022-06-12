import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../redux/actions/userAction";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSignin.user);

  const signInWithGoogle = () => {
    dispatch(login());
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  const flexCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <video id="background-video" className="videoTag" autoPlay loop muted>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/social-media-app-9e505.appspot.com/o/video%2Fbg_loop.mp4?alt=media&token=ef1a78b1-50fd-4f1f-bcef-816e79a23128"
          type="video/mp4"
        />
      </video>
      <Box minHeight="100vh" minWidth="100vw" sx={flexCenter}>
        <Container maxWidth="sm" sx={flexCenter}>
          <Card
            elevation={5}
            sx={{
              border: 1,
              borderColor: grey[800],
              backdropFilter: "blur(5px)",
              backgroundColor: "transparent",
            }}
          >
            <CardContent>
              <Typography
                color="primary"
                textAlign="center"
                variant="h4"
                fontWeight="bold"
                component="h1"
              >
                Welcome To InstaClone
              </Typography>
              <Typography
                textAlign="center"
                variant="h6"
                gutterBottom
                component="h2"
                fontWeight="regular"
              >
                Sign In now and make new friends!
              </Typography>
              <Box width="100%" sx={flexCenter}>
                <GoogleButton onClick={signInWithGoogle} />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
