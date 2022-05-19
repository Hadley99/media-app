import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreatePost from "../components/home/CreatePost";
import Feed from "../components/home/Feed";
import GoogleAuth from "../components/GoogleAuth";

const Home = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="md">
        <GoogleAuth />
        <CreatePost />
        <Stack marginY={2}>
          <Feed />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
