import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
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

export const sentMsg = async ({ name, message, channelId }) => {
  await addDoc(collection(db, "channels", channelId, "messages"), {
    timestamp: serverTimestamp(),
    message,
    name,
  });
};

export const sentDirectMsg = async ({ toUid, currentUid, message, name }) => {
  let collecitonRef = await dmCollection(toUid, currentUid);
  await addDoc(collecitonRef, {
    timestamp: serverTimestamp(),
    message,
    name,
  });
};

const dmCollection = async (toUid, currentUid) => {
  const idPair = [currentUid, toUid].join("_");
  return collection(db, "dms", idPair, "messages");
};
