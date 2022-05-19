import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import { display, fontWeight } from "@mui/system";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import {
  fetchSelectedPosts,
  fetchSelectedUser,
} from "../../redux/actions/fetchActions";

const ProfileDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.selectedUser.user);
  const posts = useSelector((state) => state.selectedPosts.posts) || [];
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  useEffect(() => {
    dispatch(fetchSelectedUser(id));
    dispatch(fetchSelectedPosts(id));
  }, [id, dispatch]);
  console.log(posts);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container paddingY={4} spacing={2}>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Box
              component="img"
              sx={{ borderRadius: 50 }}
              src={photoURL}
              alt={displayName}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography fontSize={30} fontWeight="bold">
              {displayName}
            </Typography>
            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{ backgroundColor: grey[400] }}
                  flexItem
                />
              }
              spacing={2}
            >
              <Typography textAlign="center" fontSize={20} fontWeight="medium">
                Posts
                <br />
                <Typography component="span" fontSize={18}>
                  {posts?.length}
                </Typography>
              </Typography>
              <Typography textAlign="center" fontSize={20} fontWeight="medium">
                Friends <br />
                <Typography component="span" fontSize={18}>
                  21
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box paddingY={2}>
        <Typography variant="h4" fontWeight="bold" component="h1">
          POSTS
        </Typography>
        <Divider orientation="horizontal" sx={{ backgroundColor: grey[400] }} />
      </Box>

      <ImageList variant="masonry" cols={3}>
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
    </Box>
  );
};

export default ProfileDetails;
