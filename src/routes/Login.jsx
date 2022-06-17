import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { grey } from "@mui/material/colors";

import GoogleButton from "react-google-button";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.userSignin);

  const signInWithGoogle = () => {
    dispatch(login());
  };
  useEffect(() => {
    if (user) {
      // setLoading(false);
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
                backdropFilter: "blur(20px)",
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
                  color="white"
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
    </>
  );
};

export default Login;
