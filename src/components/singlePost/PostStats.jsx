import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import React from "react";
import LikeButton from "../LikeButton";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
const PostStats = ({ post, allComments }) => {
  return (
    <>
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
          <IconButton disableRipple sx={{ padding: 0, marginLeft: 2 }}>
            <InsertCommentOutlinedIcon />
          </IconButton>
          <Typography
            marginLeft={1}
            component="small"
            fontSize={14}
            fontWeight="bold"
          >
            {allComments?.length}{" "}
            {allComments?.length === 1 ? "Comment" : "Comments"}
          </Typography>
        </>
      </Stack>
    </>
  );
};

export default PostStats;
