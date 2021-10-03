import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { collection, doc, addDoc } from "firebase/firestore";
import db from "../../firebase";
import {
  selectChannelId,
  selectChannelName,
} from "../../redux/common/channel/selectors";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const sendMessage = async (evn) => {
    evn.preventDefault();
    if (inputRef.current.value.trim()) {
      console.log(doc(db, "channels", selectChannelId));
      // addDoc(db.collection("channels"), {
      //   // need to continue
      // });
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
