import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LikeButton from "../LikeButton";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { grey } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";

import { RWebShare } from "react-web-share";

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
        <>
          <RWebShare
            data={{
              text: `Check this post out ${post?.createdBy?.displayName} on Friend.ly`,
              url: `${window.location.href}`,
              title: "Friend.ly",
            }}
          >
            <IconButton
              disableRipple
              sx={{
                padding: 0,
                marginLeft: 1,
                "&:hover": {
                  color: grey[400],
                },
              }}
            >
              <ShareIcon />
            </IconButton>
          </RWebShare>
        </>
      </Stack>
    </>
  );
};

export default PostStats;
