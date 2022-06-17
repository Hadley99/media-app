import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";
import React from "react";

const LoadingAnimation = () => {
  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingAnimation;
