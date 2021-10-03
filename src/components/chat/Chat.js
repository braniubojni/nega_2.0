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
  const [inputVal, setInputVal] = useState("");
  const sendMessage = async (evn) => {
    evn.preventDefault();
    if (inputVal.trim()) {
      addDoc(db.collection("channels"), {
        // need to continue
      });
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
          onChange={(e) => setInputVal(e.target.value)}
          ref={inputRef}
          placeholder={
            channelId
              ? `Send a message to # ${channelName}`
              : "Select any channel"
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
