import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import { grey } from "@mui/material/colors";
import Box from "@mui/system/Box";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import SingleImageItem from "./SingleImageItem";
import { Link } from "react-router-dom";

const ProfileGallery = ({ posts }) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container marginBottom={3} spacing={{ xs: 1, sm: 2, md: 3 }}>
          {posts &&
            posts.map((post) => (
              <Grid item xs={12} sm={4} md={4} key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <SingleImageItem post={post} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProfileGallery;
