import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/home/CreatePost";
import Feed from "../components/home/Feed";

const Home = (e) => {
  const { loading } = useSelector((state) => state.userSignin);

  return (
    <Container sx={{ mt: 8, pt: 2 }} maxWidth="md">
      <>
        {!loading && <CreatePost />}
        <Stack marginY={2}>
          <Feed />
        </Stack>
      </>
    </Container>
  );
};

export default Home;
