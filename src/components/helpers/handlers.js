import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import db from "../../firebase";

const channelRef = collection(db, "channels");
const usersRef = collection(db, "users");

export const handleNewChannel = async (channelName) => {
  addDoc(channelRef, { channelName });
};

export const handleChannelRemove = async (id) => {
  await deleteDoc(doc(channelRef, id));
};

export const handleEdit = async ({ channelId, id, msgInfo }) => {
  const docRef = doc(collection(db, "channels", channelId, "messages"), id);
  await setDoc(docRef, msgInfo);
};

export const handleRemove = async ({ channelId, id }) => {
  await deleteDoc(doc(collection(db, "channels", channelId, "messages"), id));
};

export const handleUserRemove = async (id) => {
  await deleteDoc(doc(usersRef, id));
};
