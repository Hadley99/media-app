import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import LoadingAnimation from "../../LoadingAnimation";
import AllComments from "./AllComments";

const Comments = ({ post, allComments }) => {
  const { loading: loadingOfComments, errorMessage } = useSelector(
    (state) => state.fetchComments
  );
  // const allComments = useSelector((state) => state.fetchComments.allComments);
  return (
    <div>
      <Box
        overflowY="scroll"
        className="scroll"
        sx={{
          maxHeight: { md: 300, sm: 200 },
          width: "100%",
          "& first child": { marginTop: 0 },
        }}
      >
        {loadingOfComments ? (
          <Box
            width="100%"
            height={{ md: 300, sm: 200 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingAnimation />
          </Box>
        ) : (
          allComments?.map((comment) => (
            <AllComments postId={post.id} key={comment.id} comment={comment} />
          ))
        )}
        {errorMessage && (
          <Typography
            component="p"
            width="100%"
            height={{ md: 300, sm: 200 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Comments;
