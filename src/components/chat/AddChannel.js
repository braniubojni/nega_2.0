import { memo, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { handleNewChannel } from "../helpers/handlers";
import { Box } from "@mui/system";

function AddNewChannel() {
  const [open, setOpen] = useState(false);
  const [newChannel, setNewChannel] = useState("");

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const addNewChanel = useCallback(() => {
    if (newChannel) {
      handleNewChannel(newChannel);
      setOpen(false);
    }
    setNewChannel("");
  }, [newChannel]);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Box>
        <AddIcon cursor="pointer" onClick={handleClickOpen} />
      </Box>
      <Dialog open={open} onClose={closeModal}>
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
            label="New Channel Name"
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewChanel()}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addNewChanel}>YES</Button>
          <Button onClick={closeModal}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(AddNewChannel);
