import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { collection, getDocs } from "@firebase/firestore";
import db from "../../firebase";
import { Toolbar } from "@mui/material";
import MessageLoader from "../loader/MessageLoader";

export default function SearchDrawer({ searchInput }) {
  const [messages, setMessages] = useState([]);
  const [filteredChannelMessages, setFilteredChannelMessages] = useState([]);
  const [state, setState] = useState({
    right: false,
  });

  useEffect(() => {
    const getMessages = async () => {
      const channels = await getDocs(collection(db, "channels"));
      channels.forEach(async (channel) => {
        const msgs = await getDocs(
          collection(db, "channels", channel.id, "messages")
        );
        msgs.forEach((msg) => {
          setMessages((prev) => [...prev, msg.data()]);
        });
      });
    };
    return () => {
      getMessages();
      return setMessages([]);
    };
  }, [searchInput]);
  useEffect(() => {
    setFilteredChannelMessages(
      messages.filter((item) =>
        item.message.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [messages, searchInput]);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    if (!!searchInput) {
      setState({ right: true });
    } else {
      setState({ right: false });
    }
  }, [searchInput]);

  function list(anchor) {
    return (
      <>
        <Toolbar />
        <Box
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : "45vw",
          }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <Box>
            {!filteredChannelMessages ? (
              <MessageLoader />
            ) : (
              filteredChannelMessages.map((item) => (
                <ListItem key={item.timestamp}>
                  <ListItemText
                    sx={{ py: 0, minHeight: 32 }}
                    primary={`${item.name} ===> ${item.message}`}
                  />
                </ListItem>
              ))
            )}
          </Box>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  }

  return (
    <>
      <Toolbar />
      <Fragment key={"right"}>
        <Drawer
          disableEnforceFocus
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </Fragment>
    </>
  );
}
