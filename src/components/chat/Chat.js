import { getAuth } from "@firebase/auth";
import { query, orderBy } from "firebase/firestore";
import { useEffect, useRef, useState, useCallback } from "react";
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
import Emoji from "./emoji/Emoji";

const Arrow = styled("div")(({ theme }) => ({
  cursor: "pointer",
  paddingLeft: theme.spacing(1),
}));
const Field = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "53vw",
}));
const MenuBar = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  marginTop: theme.spacing(1),
}));
const MainContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "70vh",
}));
const Ul = styled("ul")({
  listStyle: "none",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "1%",
  width: "100%",
});
const TextFieldWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: theme.spacing(1),
  padding: 10,
  "&:focus-within": {
    border: "2px solid black",
    transition: "all 0.2s",
  },
}));

function Chat() {
  const [messages, setMessages] = useState(null);
  const [sent, setSent] = useState(false);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const chatRef = useRef(null);

  useEffect(() => {
    //`channels/${channelId}/messages`
    const msgRef = query(
      collection(db, `channels/${channelId}/messages`),
      orderBy("timestamp")
    );
    onSnapshot(msgRef, (snapshot) => {
      setMessages(snapshot?.docs);
    });
    return () => {
      setMessages([]);
    };
  }, [channelId]);

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
      setSent(true);
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
    <MainContentWrapper>
      <Ul>
        {!!messages?.length && messages?.map((msg) => renderMsg(msg))}
        <li ref={chatRef} />
      </Ul>
      <div style={{ flex: "1 1 auto" }} />
      <TextFieldWrapper>
        <Box
          component="form"
          onSubmit={sendMessage}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Field>
            <TextField
              id="standard-basic"
              disabled={!channelId}
              inputRef={inputRef}
              placeholder={
                channelId ? `Message # ${channelName}` : "Select any channel"
              }
              sx={{
                marginRight: "1%",
                flex: "1 1 auto",
              }}
              variant="standard"
              fullWidth={true}
            />
            <Emoji inputRef={inputRef} isDisabled={channelId} Sent={sent} />
            <MenuBar>
              <Arrow>
                <SendIcon onClick={sendMessage} />
              </Arrow>
            </MenuBar>
          </Field>
        </Box>
      </TextFieldWrapper>
    </MainContentWrapper>
  );
}

export default Chat;
