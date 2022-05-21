import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import { grey } from "@mui/material/colors";
import Box from "@mui/system/Box";
import React, { useState } from "react";

const ProfileGallery = ({ posts }) => {
  const [gridLayout, setGridLayout] = useState(false);
  return (
    <>
      <Box paddingY={2}>
        <Typography variant="h4" fontWeight="bold" component="h1">
          POSTS
          <Button onClick={() => setGridLayout((prev) => !prev)}>
            Togle layout
          </Button>
        </Typography>
        <Divider orientation="horizontal" sx={{ backgroundColor: grey[400] }} />
      </Box>
      <ImageList cols={gridLayout ? 1 : 3} gap={8} variant={"masonry"}>
        {posts.map((post) => (
          <ImageListItem key={post.id}>
            <img
              src={`${post.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${post.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={post.description}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default ProfileGallery;
