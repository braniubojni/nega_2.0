import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import db from "../../firebase";

export const handleEdit = async ({ channelId, id, msgInfo }) => {
  const docRef = doc(collection(db, "channels", channelId, "messages"), id);

  await setDoc(docRef, { msgInfo });
};

export const handleDelete = async ({ channelId, id }) => {
  const removeItem = doc(collection(db, "channels", channelId, "messages"), id);
  await deleteDoc(removeItem);
};
