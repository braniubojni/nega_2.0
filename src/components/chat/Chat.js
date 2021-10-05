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

const BottomDiv = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));
const MainContentWrapper = styled("div")({
  position: "relative",
});
const H4 = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
}));
const Ul = styled("ul")({
  listStyle: "none",
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
}));

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

  // const scrollToBottom = () => {
  //   chatRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // };

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
      // scrollToBottom(); // need for reach the last msg
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextFieldWrapper>
          <Field>
            <TextField
              id="standard-basic"
              disabled={!channelId}
              placeholder={
                channelId ? `Message # ${channelName}` : "Select any channel"
              }
              variant="standard"
            />
          </Field>
          <Arrow>
            <SendIcon onClick={sendMessage} />
          </Arrow>
        </TextFieldWrapper>
      </Box>
    </div>
  );
}

export default Chat;
