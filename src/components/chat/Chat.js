import { getAuth } from "@firebase/auth";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styled from "styled-components";
import db from "../../firebase";
import {
  selectChannelId,
  selectChannelName,
} from "../../redux/common/channel/selectors";

const BottomDiv = styled.div`
  padding-bottom: 20px;
`;
const MainContentWrapper = styled.div`
  position: relative;
`;
const H4 = styled.div`
  position: absolute;
  top: 20px;
`;

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current.scrollInfoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = async (evn) => {
    evn.preventDefault();
    const auth = getAuth();
    if (inputRef.current.value.trim()) {
      const docRef = await addDoc(
        collection(db, `channels/${channelId}/messages`),
        {
          timestamp: serverTimestamp(),
          message: inputRef.current.value,
          name: auth.currentUser.email,
        }
      );
      inputRef.current.value = "";
      scrollToBottom();
    }
  };
  return (
    <div>
      <H4>
        {!channelName
          ? "Select any channel"
          : `You are in the channel ${channelName}`}
      </H4>
      <ul>{}</ul>
      <BottomDiv ref={chatRef} />
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
