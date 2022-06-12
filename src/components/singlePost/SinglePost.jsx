import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CreateComment from "./CreateComment";
import LikeButton from "../LikeButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AllComments from "./AllComments";
import { fetchCommentsOfPost } from "../../redux/actions/commentsAction";
import { CircularProgress, IconButton } from "@mui/material";
import { fetchSelectedPost } from "../../redux/actions/fetchActions";
import AlertSnackbar from "../AlertSnackbar";
import { Constants } from "../../redux/constants/constants";
import DropdownMenu from "../home/DropdownMenu";
import ConfirmDialog from "../ConfirmDialog";
import { deletePost } from "../../redux/actions/postsAction";

const SinglePost = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.selectedPost.post) || [];
  const allComments = useSelector((state) => state.fetchComments.comments);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { success: successOfDeleteComment, message: messageOfDeleteComment } =
    useSelector((state) => state.deleteComment);

  const { loading: loadingOfComments, errorMessage } = useSelector(
    (state) => state.fetchComments
  );

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
  const handleDelete = (id, uid) => {
    dispatch(deletePost(id, uid));
    navigate("/");
  };

  return (
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
                  <Box>
                    <Card elevation={0}>
                      <CardHeader
                        action={
                          <DropdownMenu
                            content={post}
                            setDialogOpen={setDialogOpen}
                          />
                        }
                        sx={{ paddingTop: 0, paddingLeft: 0 }}
                        avatar={
                          <Link to={`/user/${post.createdBy?.uid}`}>
                            <Avatar
                              aria-label="profile"
                              src={post.createdBy?.photoURL}
                            />
                          </Link>
                        }
                        title={
                          <Link to={`/user/${post.createdBy?.uid}`}>
                            {post.createdBy?.displayName}
                          </Link>
                        }
                        subheader={post.timestamp}
                        titleTypographyProps={{
                          fontWeight: "medium",
                          fontSize: "16px",
                        }}
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
                        <Box paddingY={1}>{post.description}</Box>
                        <Stack flexDirection="row" alignItems="center">
                          <>
                            <LikeButton post={post} />
                            <Typography
                              marginLeft={1}
                              component="small"
                              fontSize={14}
                              fontWeight="bold"
                            >
                              {post.likedBy?.length}{" "}
                              {post.likedBy?.length === 1 ? "Like" : "Likes"}
                            </Typography>
                          </>
                          <>
                            <IconButton
                              disableRipple
                              sx={{ padding: 0, marginLeft: 2 }}
                            >
                              <ChatBubbleOutlineIcon />
                            </IconButton>
                            <Typography
                              marginLeft={1}
                              component="small"
                              fontSize={14}
                              fontWeight="bold"
                            >
                              {allComments?.length}{" "}
                              {allComments?.length === 1
                                ? "Comment"
                                : "Comments"}
                            </Typography>
                          </>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </Stack>
                <CreateComment postid={postid} />
                <Box
                  overflowY="scroll"
                  className="scroll"
                  sx={{
                    maxHeight: { md: 300, sm: 200 },
                    width: "100%",
                    "& first child": { marginTop: 0 },
                  }}
                >
                  {loadingOfComments ? (
                    <Box
                      width="100%"
                      height={{ md: 300, sm: 200 }}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : allComments ? (
                    allComments.map((comment) => (
                      <AllComments
                        postId={post.id}
                        key={comment.id}
                        comment={comment}
                      />
                    ))
                  ) : (
                    <Typography
                      component="p"
                      width="100%"
                      height={{ md: 300, sm: 200 }}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default SinglePost;
