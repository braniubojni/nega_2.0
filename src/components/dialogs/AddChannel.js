import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { handleNewChannel } from "../helpers/handlers";

export default function AddNewChannel() {
  const [open, setOpen] = useState(false);
  const [newChannel, setNewChannel] = useState("");
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addNewChanel = () => {
    if (newChannel) {
      handleNewChannel(newChannel);
      setOpen(false);
    }
    setNewChannel("");
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddIcon cursor="pointer" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Type your channel name"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addNewChanel}>YES</Button>
          <Button autoFocus onClick={closeModal}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
