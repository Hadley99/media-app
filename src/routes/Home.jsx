import { Container, Stack } from "@mui/material";
import React from "react";
import CreatePost from "../components/home/CreatePost";
import Feed from "../components/home/Feed";

const Home = () => {
  return (
    <Container sx={{ mt: 8, pt: 2 }} maxWidth="md">
      <CreatePost />
      <Stack marginY={2}>
        <Feed />
      </Stack>
    </Container>
  );
};

export default Home;
