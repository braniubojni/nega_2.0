import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getDocs,
} from "@firebase/firestore";
import db from "../../firebase";

const channelRef = collection(db, "channels");
const usersRef = collection(db, "users");

export const handleNewChannel = async (channelName) => {
  addDoc(channelRef, { channelName });
};

export const handleChannelRemove = async (id) => {
  const msgRef = collection(db, "channels", id, "messages");
  const snapshots = await getDocs(msgRef);
  snapshots.forEach(({ id }) => {
    deleteDoc(doc(msgRef, id));
  });
  await deleteDoc(doc(channelRef, id));
};

export const handleMsgEdit = async ({ channelId, id, msgInfo }) => {
  const docRef = doc(collection(db, "channels", channelId, "messages"), id);
  await setDoc(docRef, msgInfo);
};

export const handleMsgRemove = async ({ channelId, id }) => {
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

export const getDirectMessages = async ({ toUid, currentUid }) => {
  const collectionRef = await retrieveDM(toUid, currentUid);
  const messageRef = query(collectionRef, orderBy("timestamp"));
  return messageRef;
};

const retrieveDM = async (toUid, currentUid) => {
  const idPair = [currentUid, toUid].sort().join("_");
  return collection(db, "dms", idPair, "messages");
};

export const sentDirectMsg = async ({ toUid, currentUid, message, name }) => {
  const collecitonRef = await dmCollection(toUid, currentUid);
  await addDoc(collecitonRef, {
    timestamp: serverTimestamp(),
    message,
    name,
  });
};

const dmCollection = async (toUid, currentUid) => {
  const idPair = [currentUid, toUid].sort().join("_");
  return collection(db, "dms", idPair, "messages");
};
