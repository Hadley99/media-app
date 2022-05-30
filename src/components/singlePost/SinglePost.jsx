import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import Card from "@mui/material/Card";
import CreateComment from "./CreateComment";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllComments from "./AllComments";
import { fetchCommentsOfPost } from "../../redux/actions/commentsAction";
import { userDocumentRef } from "../../firebase/firebase";
import { getDoc } from "firebase/firestore";

const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedPost.post) || [];
  const user = useSelector((state) => state.userSignin.user);

  useEffect(() => {
    dispatch(fetchCommentsOfPost(post.id));
  }, [dispatch, post.id]);
  return (
    <Box sx={{ mt: 8, paddingTop: 4 }}>
      <Container maxWidth="lg">
        <Card elevation={0} sx={{ borderColor: grey[300] }}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              {post && (
                <CardMedia
                  component="img"
                  sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    objectFit: "contain",
                    backgroundColor: "black",
                    maxHeight: "80vh",
                  }}
                  src={post.image}
                  alt={post.description}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Box />
              </Stack>
              <CreateComment />
              <AllComments postId={post.id} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};
export default SinglePost;
