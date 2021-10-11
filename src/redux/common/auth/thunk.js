import { addDoc, collection, onSnapshot } from "@firebase/firestore";
import { setLoggedinUser } from "./actions";
import db from "../../../firebase";

const signInUser = (auth) => (dispatch) => {
  const currentUser = auth.currentUser;
  onSnapshot(collection(db, "users"), (snapshot) => {
    dispatch(
      setLoggedinUser(
        snapshot.docs
          .map((doc) => doc.data())
          .find((user) => user.email === currentUser.email)
      )
    );
  });
};

const signUpUser =
  ({ usrCollection, userData }) =>
  (dispatch) => {
    addDoc(usrCollection, userData, userData.id);
    dispatch(setLoggedinUser(userData));
  };

const thunk = {
  signInUser,
  signUpUser,
};

export default thunk;
