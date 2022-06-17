import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import CreateComment from "./comments/CreateComment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCommentsOfPost } from "../../redux/actions/commentsAction";
import { fetchSelectedPost } from "../../redux/actions/fetchActions";
import AlertSnackbar from "../AlertSnackbar";
import { Constants } from "../../redux/constants/constants";
import ConfirmDialog from "../ConfirmDialog";
import { deletePost } from "../../redux/actions/postsAction";
import PostStats from "./PostStats";
import LoadingAnimation from "../LoadingAnimation";
import PostHeader from "./PostHeader";
import Comments from "./comments/Comments";

const SinglePost = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.selectedPost.post) || [];
  const { loading } = useSelector((state) => state.selectedPost);
  const allComments = useSelector((state) => state.fetchComments.comments);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { success: successOfDeleteComment, message: messageOfDeleteComment } =
    useSelector((state) => state.deleteComment);

  const handleDelete = (id, uid, imageUrl) => {
    dispatch(deletePost(id, uid, imageUrl));
    navigate("/");
  };
  const handleClose = () => {
    dispatch({
      type: Constants.DELETE_COMMENTS_SUCCESS,
      payload: { success: false, message: null },
    });
  };

  useEffect(() => {
    dispatch(fetchSelectedPost(postid));
  }, [dispatch, postid]);

  useEffect(() => {
    dispatch(fetchCommentsOfPost(post?.id));
  }, [dispatch, post?.id]);

  useEffect(() => {
    return () => {
      dispatch({ type: Constants.SELECTED_POST_FETCH_SUCCESS, payload: null });
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch({
        type: Constants.FETCH_COMMENTS_OF_POST_SUCCESS,
        payload: null,
      });
    };
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ mt: { md: 8, xs: 5, sm: 6 }, paddingTop: 4 }}>
          <LoadingAnimation />
        </Box>
      ) : (
        <>
          <AlertSnackbar
            variant="filled"
            severity="success"
            message={messageOfDeleteComment}
            handleAction={handleClose}
            open={successOfDeleteComment}
          />
          <Box sx={{ mt: { md: 8, xs: 5, sm: 6 }, paddingTop: 4 }}>
            <Container maxWidth="lg">
              <Card sx={{ borderRadius: 0 }} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item md={8} xs={12}>
                    <PostHeader
                      post={post}
                      display={{ xs: "flex", md: "none" }}
                      setDialogOpen={setDialogOpen}
                    />
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
                  <Grid item md={4} xs={12}>
                    <Stack>
                      <>
                        <Card elevation={0}>
                          <PostHeader
                            post={post}
                            display={{ xs: "none", md: "flex" }}
                            setDialogOpen={setDialogOpen}
                          />
                          <ConfirmDialog
                            dialogTitle={`Are you sure you want to delete this post ?`}
                            handleAction={handleDelete}
                            content={post}
                            open={dialogOpen}
                            setDialogOpen={setDialogOpen}
                          />
                          <CardContent
                            sx={{
                              paddingTop: 0,
                              paddingLeft: 0,
                              "&:last-child": { paddingBottom: 0 },
                            }}
                          >
                            <Typography paddingY={1}>
                              {post.description}
                            </Typography>
                            <PostStats post={post} allComments={allComments} />
                          </CardContent>
                        </Card>
                      </>
                    </Stack>
                    <CreateComment postid={postid} />
                    <Comments post={post} allComments={allComments} />
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
export default SinglePost;
