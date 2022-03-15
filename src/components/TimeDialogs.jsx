import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const TimeDialogs = ({ open, close }) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Hello</DialogTitle>
      <DialogContent>World</DialogContent>
    </Dialog>
  );
};

export default TimeDialogs;
