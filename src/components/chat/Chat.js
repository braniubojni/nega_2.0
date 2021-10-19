import { getAuth } from "@firebase/auth";
import { query, orderBy } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
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
import Emoji from "./Emoji";
import { useLocation } from "react-router";
import { getDirectMessages, sentDirectMsg, sentMsg } from "../helpers/handlers";
import Loader from "../loader/Loader";

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
  "&::-webkit-scrollbar": {
    width: 10,
    height: 10,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  },
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
  const [messages, setMessages] = useState([]);
  const [sent, setSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { pathname } = useLocation();
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUserId(
        snapshot?.docs
          .map((doc) => doc.data())
          .find((user) => user.email === channelName)
      );
    });
    onSnapshot(collection(db, "users"), (snapshot) => {
      setCurrentUserId(
        snapshot?.docs
          .map((doc) => doc.data())
          .find((user) => user.email === auth.currentUser.email)
      );
    });
    return () => {
      setCurrentUserId(null);
      setUserId(null);
    };
  }, [channelName, auth]);

  useEffect(() => {
    if (pathname.includes("channels")) {
      const messagesRef = query(
        collection(db, `channels/${channelId}/messages`),
        orderBy("timestamp")
      );
      onSnapshot(messagesRef, (snapshot) => {
        setMessages(snapshot.docs);
      });
    } else if (pathname.includes("users")) {
      if (userId && currentUserId) {
        getDirectMessages({
          toUid: userId.id,
          currentUid: currentUserId.id,
        }).then((messagesRef) => {
          onSnapshot(messagesRef, (snapshot) => {
            setMessages(snapshot.docs);
          });
        });
      }
    }

    return () => setMessages([]);
  }, [channelId, currentUserId, pathname, userId]);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = async (evn) => {
    evn.preventDefault();
    if (inputRef.current.value !== "") {
      pathname.includes("channels")
        ? sentMsg({
            channelId,
            message: inputRef.current.value,
            name: auth.currentUser.email,
          })
        : sentDirectMsg({
            toUid: userId.id,
            currentUid: currentUserId.id,
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
        {!messages ? (
          <Loader />
        ) : (
          <>
            {messages?.map((msg) => renderMsg(msg))}
            <li ref={chatRef} />
          </>
        )}
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
            <MenuBar>
              <Emoji inputRef={inputRef} isDisabled={channelId} Sent={sent} />

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
