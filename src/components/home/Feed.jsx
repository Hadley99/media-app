import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import AlertSnackbar from "../AlertSnackbar";
import { grey } from "@mui/material/colors";

import InfiniteScroll from "react-infinite-scroll-component";

import { fetchAllPosts, loadMoreData } from "../../redux/actions/fetchActions";
import { Constants } from "../../redux/constants/constants";
import LoadingAnimation from "../LoadingAnimation";
import EachPostCard from "./EachPostCard";

// import {
//   LazyLoadComponent,
//   LazyLoadImage,
// } from "react-lazy-load-image-component";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.fetchPost);
  const { loading, posts, errorMessage, end } = feed;
  const { loading: loadingOfCreate } = useSelector((state) => state.createPost);

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
    dispatch(fetchAllPosts());
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: Constants.POSTS_RESET });
    };
  }, []);

  const handleFetchPosts = () => {
    dispatch(loadMoreData());
  };

  return (
    <>
      <AlertSnackbar
        variant="filled"
        severity="success"
        message={messageOfDeletePost}
        handleAction={handleClose}
        open={successOfDeletePost}
      />

      {loading || loadingOfDeletePost || loadingOfCreate ? (
        <LoadingAnimation />
      ) : (
        <>
          <InfiniteScroll
            dataLength={posts && posts.length}
            next={handleFetchPosts}
            hasMore={!end}
            endMessage={
              <Typography color={grey[500]} textAlign="center">
                {errorMessage}
              </Typography>
            }
          >
            {posts?.map((post) => (
              <EachPostCard
                key={post.id}
                post={post}
                //  handleDelete={handleDelete}
              />
            ))}
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default Feed;
