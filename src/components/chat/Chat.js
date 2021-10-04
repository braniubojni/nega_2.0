import { getAuth } from "@firebase/auth";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import {
  selectChannelId,
  selectChannelName,
} from "../../redux/common/channel/selectors";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const chatRef = useRef(null);

  const scrollToBottom = () => {};

  const sendMessage = async (evn) => {
    evn.preventDefault();
    const auth = getAuth();
    if (inputRef.current.value.trim()) {
      // setDoc is need when message is rendered need to edit that message
      const newMsg = {
        timestamp: serverTimestamp(),
        message: inputRef.current.value.trim(),
        name: auth.currentUser.email,
      };
      const messages = doc(db, `channels`, channelId, "messages", newMsg);

      // inputRef.current.value = "";
      // scrollToBottom();
    }
  };
  return (
    <div>
      <h4>
        {!channelName
          ? "Select any channel"
          : `You are in the channel ${channelName}`}
      </h4>
      <ul>{}</ul>
      <form>
        <input
          type="text"
          disabled={!channelId}
          ref={inputRef}
          placeholder={
            channelId ? `Message # ${channelName}` : "Select any channel"
          }
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
