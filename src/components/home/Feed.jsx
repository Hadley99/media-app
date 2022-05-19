import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/actions/fetchActions";

import SinglePost from "./SinglePost";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  const feed = useSelector((state) => state.fetchPost);
  const create = useSelector((state) => state.createPost);
  const { loading, posts } = feed;

  useEffect(() => {
    if (user) {
      dispatch(fetchAllPosts());
    }

    return () => {
      dispatch(fetchAllPosts());
    };
  }, [dispatch, user]);
  return (
    <Box>
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
        posts && posts.map((post) => <SinglePost key={post.id} post={post} />)
      )}
    </Box>
  );
};

export default Feed;
