import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useRef } from "react";
import db from "../../firebase";

export const useGetChannelMessages = async ({ channelId }) => {
  let messages = useRef(null);
  const messagesRef = query(
    collection(db, `channels/${channelId}/messages`),
    orderBy("timestamp")
  );
  onSnapshot(messagesRef, (snapshot) => {
    messages = snapshot.docs;
  });
  return await messages;
};
