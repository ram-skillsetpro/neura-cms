import React from "react";
import { Slide, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

function SnackBar({ show, status, message, onClose }) {
  
  const handleClose = () => {
    onClose({ show: false, error: "", message: "" });
  };

  // Ensure that status is one of the valid severity values or default to "info"
  const severity = ["error", "info", "success", "warning"].includes(status)
    ? status
    : "info";

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant={"filled"}
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
