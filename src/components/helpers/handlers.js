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
  onSnapshot,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
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

const useGetAllExistingChannels = async () => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "channels"), (snapshot) =>
      setChannels(snapshot?.docs)
    );
    return () => setChannels([]);
  }, []);
  return channels;
};
const useGetAllExistingUsers = async () => {
  const [users, setUsers] = useState([]);
  onSnapshot(collection(db, "channels"), (snapshot) =>
    setUsers(snapshot?.docs)
  );
  return users;
};

export const useGetAllChannels = async () => {
  const channels = await getDocs(channelRef);
  channels.forEach(async (channel) => {
    const msgs = await getDocs(
      collection(db, "channels", channel.id, "messages")
    );
    msgs.forEach((msg) => {
      console.log(msg.id, "=>", msg.data());
    });
  });
};
export const useGetAllChannelMsgs = async ({ id }) => {
  const msgs = await getDocs(collection(db, "channels", id, "messages"));
  return msgs;
};
