import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/system/Box";
import { grey } from "@mui/material/colors";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  changeProfileData,
  toggleUserFollow,
} from "../../redux/actions/userAction";
import ImageCropTool from "../crop/ImageCropTool";
import LoadingAnimation from "../LoadingAnimation";

const Input = styled("input")({
  display: "none",
});

const ProfileTop = ({ posts }) => {
  const dispatch = useDispatch();
  const toggleFollow = (followerId, followeeId) => {
    dispatch(toggleUserFollow(followerId, followeeId));
  };
  const { user: currentUser, loading: currentUserLoading } = useSelector(
    (state) => state.userSignin
  );
  const user = useSelector((state) => state.selectedUser.user);

  const displayName = user?.displayName;
  // const photoURL = user?.photoURL.replace("s96-c", "s400-c");

  const { loading: loadingOfProfileChange } = useSelector(
    (state) => state.changeProfilePhoto
  );
  //change name
  const [changeUserName, setChangeUserName] = useState(null);
  const [toggleUserNameInput, setToggleUserNameInput] = useState(false);
  //image crop
  const [openDialog, setOpenDialog] = useState(false);
  const [tempImg, setTempImg] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const toggleCropTool = () => {
    setOpenDialog((prev) => !prev);
  };
  const handleToggleUserNameInput = () => {
    setToggleUserNameInput((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeProfileData(file, changeUserName));
    setTempImg(null);
    setFile(null);
    setImageUrl("");
    setChangeUserName(null);
    setToggleUserNameInput(false);
  };
  return (
    <Grid container paddingY={4} spacing={2}>
      <Grid item xs={4} sm={5}>
        <Box textAlign="center">
          <form onSubmit={handleSubmit}>
            {loadingOfProfileChange || currentUserLoading ? (
              <LoadingAnimation />
            ) : (
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onInput={(e) => {
                    toggleCropTool();
                    setTempImg(e.target.files[0]);
                  }}
                />
                <Tooltip title="Click To Change Profile Photo">
                  <IconButton aria-label="upload picture" component="span">
                    <Box
                      component="img"
                      width={{ xs: "100%", sm: 160, md: 180 }}
                      sx={{ borderRadius: 50 }}
                      src={file ? URL.createObjectURL(file) : user?.photoURL}
                      alt={displayName}
                    />
                  </IconButton>
                </Tooltip>
              </label>
            )}
            {file && (
              <>
                <br />
                <Button onClick={toggleCropTool}>Edit</Button>
                <Button type="submit">Upload Image</Button>
              </>
            )}
          </form>
          {tempImg && (
            <ImageCropTool
              setFile={setFile}
              setImageUrl={setImageUrl}
              openDialog={openDialog}
              toggleCropTool={toggleCropTool}
              tempImg={URL.createObjectURL(tempImg)}
            />
          )}
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

            <IconButton onClick={handleToggleUserNameInput}>
              <SettingsIcon />
            </IconButton>
          </Typography>
          {toggleUserNameInput && (
            <>
              <TextField
                variant="standard"
                onInput={(e) => setChangeUserName(e.target.value)}
                placeholder="Change Username?"
              />
              <Button
                sx={{ marginTop: 1 }}
                onClick={handleSubmit}
                variant="contained"
              >
                Submit
              </Button>
            </>
          )}
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
            <Box textAlign="center">
              <Typography
                textAlign="center"
                sx={{ fontSize: { md: 20 } }}
                fontWeight="medium"
              >
                Posts
              </Typography>

              <Typography>{posts?.length}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                textAlign="center"
                sx={{ fontSize: { md: 20 } }}
                fontWeight="medium"
              >
                Followers
              </Typography>
              <Typography>{user?.followers.length}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                textAlign="center"
                sx={{ fontSize: { md: 20 } }}
                fontWeight="medium"
              >
                Following
              </Typography>
              <Typography>{user?.following.length}</Typography>
            </Box>
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
                ? "Following"
                : "Follow"}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileTop;
