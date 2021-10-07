import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { handleEdit } from "../helpers/handlers";

export default function EditMsg({ onEditClose, msgInfo, id, channelId }) {
  const [msg, setMsg] = useState(msgInfo.message);

  const onEditSave = ({ msg, id, channelId }) => {
    msgInfo = {
      ...msgInfo,
      message: msg,
    };
    handleEdit({ msgInfo, id, channelId });
    onEditClose();
  };
  const handleMsgEdit = (e) => {
    setMsg(e.target.value);
  };
  return (
    <div>
      <Dialog open={true} onClose={onEditClose}>
        <DialogTitle>Edit message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit your message and click SAVE to save new message, or
            click on cancel.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={msg}
            onChange={handleMsgEdit}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onEditClose}>CANCEL</Button>
          <Button onClick={() => onEditSave({ msg, id, channelId })}>
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
