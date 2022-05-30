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
import { fetchSelectedPost } from "../../redux/actions/fetchActions";

const CreateComment = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  useEffect(() => {
    dispatch(fetchSelectedPost(postid));
  }, [dispatch, postid]);

  const [comment, setComment] = useState("");

  return (
    <Box>
      <CardContent
        sx={{
          "&:last-child": { paddingBottom: 1, padding: 0 },
          display: "flex  ",
        }}
      >
        <Avatar
          aria-label="profile"
          sx={{ width: 30, height: 30 }}
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
        <label htmlFor="button-comment">
          <Button
            disableElevation
            size="small"
            variant="contained"
            id="button-comment"
            type="submit"
          >
            COMMENT
          </Button>
        </label>
      </CardContent>
    </Box>
  );
};

export default CreateComment;
