import Paper from "@mui/material/Paper";
import React from "react";

const SingleImageItem = ({ post }) => {
  return (
    <>
      <Paper sx={{ paddingX: 1, paddingTop: 1 }}>
        <img
          style={{ borderRadius: "3px" }}
          width="100%"
          src={`${post.image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${post.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={post.description}
          loading="lazy"
        />
      </Paper>
    </>
  );
};

export default SingleImageItem;
