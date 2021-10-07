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

export const handleRemove = async ({ channelId, id }) => {
  // console.log(doc(collection(db, "channels", channelId, "messages"), id));
  await deleteDoc(doc(collection(db, "channels", channelId, "messages"), id));
};
