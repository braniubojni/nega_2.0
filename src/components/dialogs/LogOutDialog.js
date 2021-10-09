import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import db from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/common/auth/actions";
import { useHistory } from "react-router";
import { getAuth, signOut } from "@firebase/auth";
import { HOME_ROUTE } from "../../constants/paths";
import { collection, doc, onSnapshot, setDoc } from "@firebase/firestore";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { handleUserOffline } from "../helpers/handlers";

export default function LogOutDialog() {
  const [open, setOpen] = useState(false);
  const [offlineUser, setOfflineUser] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) =>
      setOfflineUser(snapshot?.docs)
    );
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        history.push(HOME_ROUTE);
      })
      .then(() => {
        // handleUserOffline(offlineUser.id);
        // const docRef = doc(collection(db, "users"), userId)
        // setDoc(docRef, )
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
          <Button onClick={onHandleYesClose}>YES</Button>
          <Button autoFocus onClick={onHandleNoClose}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
