import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/actions/fetchActions";

import Button from "@mui/material/Button";
import EachPostCard from "./EachPostCard";

import SinglePost from "../singlePost/SinglePost";
import { Constants } from "../../redux/constants/constants";
import AlertSnackbar from "../AlertSnackbar";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  const feed = useSelector((state) => state.fetchPost);
  const { loading, posts } = feed;
  const {
    success: successOfDeletePost,
    message: messageOfDeletePost,
    loading: loadingOfDeletePost,
  } = useSelector((state) => state.deletePost);

  const handleClose = () => {
    dispatch({
      type: Constants.POSTS_DELETE_SUCCESS,
      payload: { success: false, message: null },
    });
  };
  useEffect(() => {
    if (user) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, user]);
  return (
    <>
      <AlertSnackbar
        variant="filled"
        severity="success"
        message={messageOfDeletePost}
        handleAction={handleClose}
        open={successOfDeletePost}
      />
      {loading ? (
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {posts &&
            posts.map((post) => <EachPostCard key={post.id} post={post} />)}
        </>
      )}
    </>
  );
};

export default Feed;
