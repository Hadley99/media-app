import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import GoogleAuth from "../components/GoogleAuth";

const Home = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="md">
        {/* <GoogleAuth />s */}
        <CreatePost />
        <Stack marginY={2}>
          <Feed />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
