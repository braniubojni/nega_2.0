import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handleMsgEdit } from "../helpers/handlers";

// add on Enter save

export default function EditMsg({ onEditClose, msgInfo, id, channelId }) {
  const [msg, setMsg] = useState(msgInfo.message);

  const onEditSave = ({ msg, id, channelId }) => {
    msgInfo = {
      ...msgInfo,
      message: msg,
    };
    handleMsgEdit({ msgInfo, id, channelId });
    onEditClose();
  };

  return (
    <div>
      <Dialog open={true} onClose={onEditClose}>
        <DialogTitle>Edit message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && onEditSave({ msg, id, channelId })
            }
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onEditClose}>CANCEL</Button>
          <Button onClick={(e) => onEditSave({ msg, id, channelId })}>
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
