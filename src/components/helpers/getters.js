import { collection, onSnapshot } from "@firebase/firestore";
import db from "../../firebase";

export const getAllUsers = async ({ setUsers }) => {
  onSnapshot(collection(db, "users"), (snapshot) => setUsers(snapshot?.docs));
  return null;
};
