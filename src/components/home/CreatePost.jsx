import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/postsAction";
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
import { grey, red } from "@mui/material/colors";
import { Button, CardActions } from "@mui/material";
const Input = styled("input")({
  display: "none",
});

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [tempImg, setTempImg] = useState(null);
  const dispatch = useDispatch();
  const create = useSelector((state) => state.createPost);
  const { loading } = create;
  const user = useSelector((state) => state.userSignin.user);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(tempImg, description));
    setDescription("");
    setTempImg(null);
  };

  return !loading ? (
    <Box component="form" onSubmit={handleSubmit}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          backgroundColor: grey[100],
          border: 1,
          borderColor: grey[300],
        }}
      >
        <CardHeader
          avatar={<Avatar aria-label="profile" src={photoURL} />}
          title={displayName}
          titleTypographyProps={{ fontWeight: "medium", fontSize: "16px" }}
        />
        <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
          <TextField
            fullWidth
            variant="standard"
            id="outlined-textarea"
            placeholder="What's on your mind ?"
            multiline
            maxRows={4}
            InputProps={{
              endAdornment: (
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => {
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
            <Button variant="contained" type="submit">
              POST
            </Button>
            {tempImg && (
              <CardMedia
                component="img"
                sx={{
                  borderRadius: 1,
                  objectFit: "contain",
                  width: "auto",
                  marginLeft: "auto",
                }}
                height="100"
                src={URL.createObjectURL(tempImg)}
                alt="test"
              />
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <div>Loading...</div>
  );
};
export default CreatePost;
