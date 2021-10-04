import { getAuth } from "@firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import styled from "styled-components";
import db from "../../firebase";
import {
  selectChannelId,
  selectChannelName,
} from "../../redux/common/channel/selectors";
import Message from "../messages/Message";

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
const Ul = styled.ul`
  list-style: none;
`;

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef("");
  const chatRef = React.createRef;

  useEffect(() => {
    onSnapshot(collection(db, `channels/${channelId}/messages`), (snapshot) => {
      setMessages(snapshot?.docs);
    });
  }, [channelId]);

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
      await addDoc(collection(db, `channels/${channelId}/messages`), {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: auth.currentUser.email,
      });
      inputRef.current.value = "";
      scrollToBottom();
    }
  };

  const renderMsg = (msgInfo) => {
    return (
      <Message key={msgInfo.id} id={msgInfo.id} msgInfo={msgInfo.data()} />
    );
  };

  return (
    <div>
      <H4>
        {!channelName
          ? "Select any channel"
          : `You are in the channel ${channelName}`}
      </H4>
      <Ul>{messages?.map((msg) => renderMsg(msg))}</Ul>
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
