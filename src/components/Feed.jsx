import { Box, CircularProgress } from "@mui/material";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import SinglePost from "./SinglePost";

const Feed = () => {
  const feed = useSelector((state) => state.fetchPost);
  const create = useSelector((state) => state.createPost);
  const { loading, posts } = feed;

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
