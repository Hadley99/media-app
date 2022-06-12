import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentsAction";

const CreateComment = ({ postid }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createComment(postid, user?.uid, comment));
    setComment("");
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <CardContent
          sx={{
            "&:last-child": { paddingBottom: 1, padding: 0 },
          }}
        >
          <Box>
            <TextField
              fullWidth
              variant="standard"
              placeholder={`Comment as ${user?.displayName}`}
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    disableElevation
                    variant="contained"
                    id="button-comment"
                    type="submit"
                    size="small"
                  >
                    COMMENT
                  </Button>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: "flex" }}></Box>
        </CardContent>
      </form>
    </Box>
  );
};

export default CreateComment;
