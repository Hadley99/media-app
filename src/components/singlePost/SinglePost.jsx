import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Avatar, CardHeader, CardMedia, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CreateComment from "./CreateComment";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllComments from "./AllComments";
import { fetchCommentsOfPost } from "../../redux/actions/commentsAction";

const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedPost.post) || [];
  const user = useSelector((state) => state.userSignin.user);
  useEffect(() => {
    dispatch(fetchCommentsOfPost(post.id));
  }, [dispatch, post.id]);
  return (
    <Box sx={{ mt: 8, pt: 2 }}>
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            backgroundColor: "white",
            border: 1,
            borderColor: grey[300],
          }}
        >
          <CardHeader
            avatar={
              <Link to={`/user/${user?.uid}`}>
                <Avatar
                  aria-label="profile"
                  sx={{ width: 35, height: 35 }}
                  src={user?.photoURL}
                />
              </Link>
            }
            title={<Link to={`/user/${user?.uid}`}>{user?.displayName}</Link>}
            titleTypographyProps={{ fontWeight: "medium", fontSize: "16px" }}
          />
          {post && (
            <CardMedia
              component="img"
              sx={{
                maxHeight: { xs: 400, md: 500 },
                paddingTop: 0,
                paddingBottom: 0,
                objectFit: "contain",
                backgroundColor: "black",
              }}
              src={post.image}
              alt={post.description}
            />
          )}
          <CreateComment />
          <AllComments postId={post.id} />
        </Card>
      </Container>
    </Box>
  );
};
export default SinglePost;
