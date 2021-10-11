import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import db from "../../firebase";

export const handleNewChannel = async (channelName) => {
  addDoc(collection(db, "channels"), { channelName });
};

export const handleEdit = async ({ channelId, id, msgInfo }) => {
  const docRef = doc(collection(db, "channels", channelId, "messages"), id);
  await setDoc(docRef, msgInfo);
};

export const handleRemove = async ({ channelId, id }) => {
  await deleteDoc(doc(collection(db, "channels", channelId, "messages"), id));
};

export const handleUserOffline = async (userId) => {
  console.log(userId);
  // const docRef = doc(collection(db, "users"), userId);
  // await setDoc(docRef, isOnline);
};
