import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  handleChannelMsgRemove,
  handleUserMsgRemove,
} from "../helpers/handlers";

export default function RemoveMsg({
  onRemoveClose,
  id,
  channelId,
  loggedUserId,
  location,
  msgInfo,
}) {
  const removeFunc = ({ channelId, id }) =>
    !location
      ? handleChannelMsgRemove({ channelId, id })
      : handleUserMsgRemove({ loggedUserId, id, msgInfo });
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
          <Button onClick={onRemoveClose}>NO</Button>
          <Button onClick={() => removeFunc({ channelId, id })}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
