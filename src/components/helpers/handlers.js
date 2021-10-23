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
  getDoc,
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
  await setDoc(docRef, msgInfo);
};

export const handleChannelMsgRemove = async ({ channelId, id }) => {
  await deleteDoc(doc(collection(db, "channels", channelId, "messages"), id));
};

export const handleUserMsgEdit = async ({ id, msgInfo, loggedUserId }) => {
  const user = await getExistingUsers({ currentUid: loggedUserId });
  const docRef = doc(collection(db, "dms", user[0], "messages"), id);
  await setDoc(docRef, msgInfo);
};

export const handleUserMsgRemove = async (id, msgId) => {
  const user = await getExistingUsers({ currentUid: id });
  await deleteDoc(doc(collection(db, "dms", user[0], "messages"), msgId));
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
  channelId,
  channelName,
}) => {
  const collecitonRef = await dmCollection(toUid, currentUid);
  await addDoc(collecitonRef, {
    timestamp: serverTimestamp(),
    message,
    name,
    channelId,
    channelName,
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

export const remDuplicate = (data, key) => [
  ...new Map(data.map((x) => [key(x), x])).values(),
];
