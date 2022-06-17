import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import SingleImageItem from "./SingleImageItem";
import { Link } from "react-router-dom";

const ProfileGallery = ({ posts, error }) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        {error && <Typography textAlign="center">{error}</Typography>}
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
