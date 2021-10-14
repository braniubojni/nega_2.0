import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { handleChannelRemove } from "../helpers/handlers";

export default function RemoveMsg({ onRemoveClose, channelId, channelName }) {
  return (
    <div>
      <Dialog open={true} onClose={onRemoveClose}>
        <DialogTitle>Remove message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure that you want to remove the channel ${channelName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRemoveClose}>NO</Button>
          <Button onClick={() => handleChannelRemove(channelId)}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
