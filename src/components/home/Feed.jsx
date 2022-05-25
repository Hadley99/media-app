import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/actions/fetchActions";

import EachPostCard from "./EachPostCard";
import { Button } from "@mui/material";

import SinglePost from "../singlePost/SinglePost";

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
        posts && posts.map((post) => <EachPostCard key={post.id} post={post} />)
      )}
      <Button fullWidth variant="contained">
        Load More
      </Button>
    </Box>
  );
};

export default Feed;
