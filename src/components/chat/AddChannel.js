import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { handleNewChannel } from "../helpers/handlers";
import { Box } from "@mui/system";

export default function AddNewChannel() {
  const [open, setOpen] = useState(false);
  const [newChannel, setNewChannel] = useState("");

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
      <Box>
        <AddIcon cursor="pointer" onClick={handleClickOpen} />
      </Box>
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
            autoFocus={true}
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
