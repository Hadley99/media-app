import Card from "@mui/material/Card";
import React from "react";

const SingleImageItem = ({ post }) => {
  return (
    <>
      <Card sx={{ paddingX: 1, paddingTop: 1, paddingBottom: 3 }}>
        <img
          style={{ borderRadius: "3px" }}
          width="100%"
          src={`${post.image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${post.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={post.description}
          loading="lazy"
        />
      </Card>
    </>
  );
};

export default SingleImageItem;
