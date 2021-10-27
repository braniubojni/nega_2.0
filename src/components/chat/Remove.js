import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { useHistory } from "react-router";

export default function RemoveMsg({
  onRemoveClose,
  id,
  name,
  removeFunc,
  dmPath,
}) {
  const history = useHistory();
  return (
    <div>
      <Dialog open={true} onClose={onRemoveClose}>
        <DialogTitle>{`Remove ${name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure that you want to remove the channel ${name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRemoveClose}>NO</Button>
          <Button
            onClick={() =>
              removeFunc(id, dmPath) && history.push(CHANNELS_ROUTE)
            }
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
