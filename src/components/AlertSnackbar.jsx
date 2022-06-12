import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertSnackbar = ({ variant, severity, handleAction, open, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleAction}>
      <Alert
        variant={variant}
        onClose={handleAction}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
