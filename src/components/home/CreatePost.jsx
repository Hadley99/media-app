import React, { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CardActions from "@mui/material/CardActions";
import { grey } from "@mui/material/colors";

import { createPost } from "../../redux/actions/postsAction";
import ImageCropTool from "../crop/ImageCropTool";
import { useDispatch, useSelector } from "react-redux";

const Input = styled("input")({
  display: "none",
});

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tempImg, setTempImg] = useState(null);
  const dispatch = useDispatch();
  const create = useSelector((state) => state.createPost);
  const { loading, error } = create;
  const { user } = useSelector((state) => state.userSignin);
  const photoURL = user?.photoURL;

  const toggleCropTool = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(file, description));
    setDescription("");
    setTempImg(null);
    setFile(null);
    setImageUrl("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,

          border: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? grey[900] : grey[300],
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/user/${user?.uid}`}>
              <Avatar aria-label="profile" src={photoURL} />
            </Link>
          }
          title={<Link to={`/user/${user?.uid}`}>{user?.displayName}</Link>}
          titleTypographyProps={{ fontWeight: "medium", fontSize: "16px" }}
        />
        <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
          {error && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            variant="standard"
            id="outlined-textarea"
            placeholder="What's on your mind ?"
            value={description}
            multiline
            maxRows={4}
            InputProps={{
              endAdornment: (
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
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              ),
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <CardActions
            sx={{
              paddingX: "0",
              display: "flex",
              alignItems: "end",
            }}
          >
            <Button
              disableElevation
              variant="contained"
              disabled={loading}
              type="submit"
            >
              POST
            </Button>
            {imageUrl && (
              <CardMedia
                onClick={toggleCropTool}
                component="img"
                sx={{
                  borderRadius: 1,
                  objectFit: "contain",
                  width: "auto",
                  marginLeft: "auto",
                }}
                height="100"
                src={URL.createObjectURL(file)}
                alt="test"
              />
            )}
          </CardActions>
        </CardContent>
      </Card>

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
  );
};
export default CreatePost;
