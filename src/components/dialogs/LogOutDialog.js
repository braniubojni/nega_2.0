import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/common/auth/actions";
import { useHistory } from "react-router";
import { getAuth, signOut } from "@firebase/auth";
import { HOME_ROUTE } from "../../constants/paths";

export default function LogOutDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        history.push(HOME_ROUTE);
      })
      .catch((error) => {
        console.log(new Error(error));
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onHandleYesClose = () => {
    handleSignOut();
    setOpen(false);
  };
  const onHandleNoClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Log out
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onHandleNoClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Want to log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to log out???
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleYesClose}>Yes</Button>
          <Button autoFocus onClick={onHandleNoClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
