import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { handleRemove } from "../helpers/handlers";

export default function EditMsg({ onRemoveClose, id, channelId }) {
  return (
    <div>
      <Dialog open={true} onClose={onRemoveClose}>
        <DialogTitle>Remove message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to remove the message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onRemoveClose()}>NO</Button>
          <Button onClick={() => handleRemove({ channelId, id })}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
