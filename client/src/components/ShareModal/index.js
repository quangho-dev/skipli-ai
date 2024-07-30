import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

const ShareModal = ({ handleCloseModal, openModal }) => {
  return (
    <Dialog onClose={handleCloseModal} open={openModal}>
      <DialogTitle>Share your caption</DialogTitle>

      <Stack direction={"row"} spacing={2} padding={"0 1.5em 1.5em"}>
        <Button variant="contained" color="secondary">
          <Stack direction={"row"} spacing={1}>
            <EmailIcon />
            <Typography>Share via email</Typography>
          </Stack>
        </Button>
        <Button variant="contained">
          <Stack direction={"row"} spacing={1}>
            <FacebookIcon />
            <Typography>Share to Facebook</Typography>
          </Stack>
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShareModal;
