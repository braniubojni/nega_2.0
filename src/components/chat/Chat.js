import { getAuth } from "@firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import db from "../../firebase";
import {
  selectChannelId,
  selectChannelName,
} from "../../redux/common/channel/selectors";
import Message from "../messages/Message";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

const H4 = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
}));
const Ul = styled("ul")({
  listStyle: "none",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  height: "30vh",
});
const Arrow = styled("div")(({ theme }) => ({
  cursor: "pointer",
  paddingLeft: theme.spacing(1),
}));
const Field = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
const TextFieldWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid black",
  padding: 10,
}));

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef("");
  const chatRef = useRef(null);

  useEffect(() => {
    onSnapshot(collection(db, `channels/${channelId}/messages`), (snapshot) => {
      setMessages(snapshot?.docs);
    });
  }, [channelId]);
  useEffect(() => {}, [inputRef]);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = async (evn) => {
    evn.preventDefault();
    const auth = getAuth();
    if (inputRef.current.value !== "") {
      await addDoc(collection(db, "channels", channelId, "messages"), {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: auth.currentUser.email,
      });
      inputRef.current.value = "";
      scrollToBottom(); // need for reach the last msg
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
      <Ul>
        {messages?.map((msg) => renderMsg(msg))}
        <li ref={chatRef} />
      </Ul>
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextFieldWrapper>
          <Field>
            <TextField
              id="standard-basic"
              disabled={!channelId}
              inputRef={inputRef}
              placeholder={
                channelId ? `Message # ${channelName}` : "Select any channel"
              }
              variant="standard"
              fullWidth
            />
          </Field>
          <Arrow>
            <SendIcon
              onSubmit={sendMessage}
              style={{
                color: inputRef.current.value === "" ? "#808080" : "black",
              }}
            />
          </Arrow>
        </TextFieldWrapper>
      </Box>
    </div>
  );
}

export default Chat;
