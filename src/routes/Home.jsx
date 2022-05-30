import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreatePost from "../components/home/CreatePost";
import Feed from "../components/home/Feed";

const Home = () => {
  return (
    <Box sx={{ mt: 8, pt: 2 }}>
      <Container maxWidth="md">
        <CreatePost />
        <Stack marginY={2}>
          <Feed />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
