import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleUserFollow } from "../../redux/actions/userAction";
const ProfileTop = ({ posts }) => {
  const dispatch = useDispatch();
  const toggleFollow = (id) => {
    dispatch(toggleUserFollow(id));
  };
  const currentUser = useSelector((state) => state.userSignin.user);
  const user = useSelector((state) => state.selectedUser.user);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL.replace("s96-c", "s400-c");
  return (
    <Grid container paddingY={4} spacing={2}>
      <Grid item xs={5}>
        <Box textAlign="center">
          <Box
            component="img"
            sx={{ borderRadius: 50, maxHeight: { xs: 120, sm: 150, md: 200 } }}
            src={photoURL}
            alt={displayName}
          />
        </Box>
      </Grid>
      <Grid item xs={7}>
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
            sx={{ fontSize: { xs: 30, sm: 40 } }}
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
              <Typography component="span">21</Typography>
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontSize: { md: 20 } }}
              fontWeight="medium"
            >
              Following <br />
              <Typography component="span">21</Typography>
            </Typography>
          </Stack>
          <Button onClick={() => toggleFollow(user.uid, currentUser.uid)}>
            Follow
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileTop;
