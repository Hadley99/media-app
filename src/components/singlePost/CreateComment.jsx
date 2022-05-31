import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createComment } from "../../redux/actions/commentsAction";
import { fetchSelectedPost } from "../../redux/actions/fetchActions";

const CreateComment = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  useEffect(() => {
    dispatch(fetchSelectedPost(postid));
  }, [dispatch, postid]);

  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(postid, user?.uid, comment));
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <CardContent
          sx={{
            "&:last-child": { paddingBottom: 1, padding: 0 },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar
              aria-label="profile"
              sx={{ width: 33, height: 33, marginRight: 1 }}
              src={user?.photoURL}
            />
            <TextField
              fullWidth
              variant="standard"
              id="outlined-textarea"
              placeholder={`Comment as ${user?.displayName}`}
              multiline
              maxRows={4}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{}}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ marginTop: 1, marginLeft: "auto" }}
              disableElevation
              size="small"
              variant="contained"
              id="button-comment"
              type="submit"
            >
              COMMENT
            </Button>
          </Box>
        </CardContent>
      </form>
    </Box>
  );
};

export default CreateComment;
