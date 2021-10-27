import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "@firebase/firestore";
import db from "../../firebase";

const channelRef = collection(db, "channels");
const usersRef = collection(db, "users");

export const handleNewChannel = async (channelName) => {
  await addDoc(channelRef, { channelName, timestamp: serverTimestamp() });
};

export const handleChannelRemove = async (id) => {
  const msgRef = collection(db, "channels", id, "messages");
  const snapshots = await getDocs(msgRef);
  snapshots.forEach(({ id }) => {
    deleteDoc(doc(msgRef, id));
  });
  await deleteDoc(doc(channelRef, id));
};

export const handleChannelMsgEdit = async ({ channelId, id, msgInfo }) => {
  const docRef = doc(collection(db, "channels", channelId, "messages"), id);
  console.log(docRef, msgInfo);
  await setDoc(docRef, msgInfo);
};

export const handleChannelMsgRemove = async ({ channelId, id }) => {
  await deleteDoc(doc(collection(db, "channels", channelId, "messages"), id));
};

export const handleUserMsgEdit = async ({ id, msgInfo }) => {
  // const userUniq = await getUserNameByName(msgInfo.channelName);
  // const uniqPair = [userUniq.id, loggedUserId].sort().join("_");
  const docRef = doc(collection(db, "dms", msgInfo.path, "messages"), id);

  await setDoc(docRef, msgInfo);
};

export const handleUserMsgRemove = async ({ id, msgInfo }) => {
  // const userUniq = await getUserNameByName(msgInfo.channelName);
  // const uniqPair = [userUniq.id, loggedUserId].sort().join("_");
  await deleteDoc(doc(collection(db, "dms", msgInfo.path, "messages"), id));
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

export const sentDirectMsg = async ({
  toUid,
  currentUid,
  message,
  name,
  path,
  userName,
}) => {
  const collectionRef = await dmCollection(toUid, currentUid);
  await addDoc(collectionRef, {
    timestamp: serverTimestamp(),
    message,
    name,
    path,
    userName,
  });
};

const dmCollection = async (toUid, currentUid) => {
  const idPair = [currentUid, toUid].sort().join("_");
  return collection(db, "dms", idPair, "messages");
};

export const getExistingUsers = ({ currentUid }) => {
  const getAllUsers = async () => {
    const uniq = [];
    const dmsRef = await getDocs(collection(db, "users"));
    const pushId = async (toUid) =>
      uniq.push([currentUid, toUid].sort().join("_"));
    dmsRef.forEach(async (doc) => {
      if (doc.data().id !== currentUid) await pushId(doc.data().id);
    });
    return uniq;
  };
  return getAllUsers();
};
