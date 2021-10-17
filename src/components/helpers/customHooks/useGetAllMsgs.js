import { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../../../firebase";

export const useGetAllMsgs = (channelId) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "channels", channelId, "messages"), (snapshot) =>
      setMessages(snapshot?.docs)
    );
    return () => setMessages([]);
  });

  return messages;
};
