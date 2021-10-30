import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../../firebase";

export const useGetChannels = () => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "channels"), (snapshot) => {
      setChannels(snapshot.docs);
    });
    return () => setChannels([]);
  }, []);
  if (channels.length) return channels;
};

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs);
    });
    return () => setUsers([]);
  }, []);
  if (users.length) return users;
};
