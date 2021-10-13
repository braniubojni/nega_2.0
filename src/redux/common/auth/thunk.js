import { addDoc, collection, onSnapshot } from "@firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { setLoggedinUser, setError } from "./actions";
import db from "../../../firebase";

const usrCollection = collection(db, "users");

const signInUser =
  ({ auth, usrEmail, usrPassword }) =>
  (dispatch) => {
    signInWithEmailAndPassword(auth, usrEmail, usrPassword)
      .then(() => {
        const currentUser = auth.currentUser;
        onSnapshot(usrCollection, (snapshot) => {
          dispatch(
            setLoggedinUser(
              snapshot?.docs
                .map((doc) => doc.data())
                .find((user) => user.email === currentUser.email)
            )
          );
        });
      })
      .catch((err) => {
        dispatch(setError(err.name));
      });
  };

const signUpUser =
  ({ userData, auth, email, password }) =>
  (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        addDoc(usrCollection, userData, userData.id);
        dispatch(setLoggedinUser(userData));
      })
      .catch((err) => {
        dispatch(setError(err));
      });
  };

export { signInUser, signUpUser };
