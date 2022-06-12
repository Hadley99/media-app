import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleUserFollow } from "../../redux/actions/userAction";
const ProfileTop = ({ posts }) => {
  const dispatch = useDispatch();
  const toggleFollow = (followerId, followeeId) => {
    dispatch(toggleUserFollow(followerId, followeeId));
  };
  const currentUser = useSelector((state) => state.userSignin.user);
  const user = useSelector((state) => state.selectedUser.user);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL.replace("s96-c", "s400-c");
  return (
    <Grid container paddingY={4} spacing={2}>
      <Grid item xs={4} sm={5}>
        <Box textAlign="center">
          <Box
            component="img"
            width={{ xs: "100%", sm: 160, md: 180 }}
            sx={{ borderRadius: 50 }}
            src={photoURL}
            alt={displayName}
          />
        </Box>
      </Grid>
      <Grid item xs={8} sm={7}>
        <Box
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{ fontSize: { xs: 24, sm: 40 } }}
            fontWeight="bold"
          >
            {displayName}
          </Typography>
          <Stack
            marginTop={3}
            marginRight={7}
            direction="row"
            spacing={1}
            justifyContent="space-between"
            divider={
              <Divider
                orientation="vertical"
                sx={{ backgroundColor: grey[400] }}
                flexItem
              />
            }
          >
            <Typography
              textAlign="center"
              sx={{ fontSize: { md: 20 } }}
              fontWeight="medium"
            >
              Posts
              <br />
              <Typography component="span">{posts?.length}</Typography>
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontSize: { md: 20 } }}
              fontWeight="medium"
            >
              Followers <br />
              <Typography component="span">{user?.followers.length}</Typography>
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontSize: { md: 20 } }}
              fontWeight="medium"
            >
              Following <br />
              <Typography component="span">{user?.following.length}</Typography>
            </Typography>
          </Stack>
          {currentUser?.uid !== user?.uid && (
            <Button
              sx={{ marginTop: 2 }}
              variant={
                user?.followers.includes(currentUser?.uid)
                  ? "outlined"
                  : "contained"
              }
              onClick={() => toggleFollow(user.uid, currentUser.uid)}
            >
              {user?.followers.includes(currentUser?.uid)
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileTop;
