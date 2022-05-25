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

  console.log(postid);
  useEffect(() => {
    dispatch(fetchSelectedPost(postid));
  }, [dispatch, postid]);

  const [comment, setComment] = useState("");

  return (
    <Box>
      <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
        <TextField
          fullWidth
          variant="standard"
          id="outlined-textarea"
          placeholder="Leave your comment here..."
          multiline
          maxRows={4}
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            endAdornment: (
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
            ),
          }}
        />
      </CardContent>
    </Box>
  );
};

export default CreateComment;
