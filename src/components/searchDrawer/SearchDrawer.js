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
import { collection, getDoc, getDocs } from "@firebase/firestore";
import db from "../../firebase";
import { Toolbar } from "@mui/material";
import MessageLoader from "../loader/MessageLoader";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { useHistory } from "react-router";

export default function SearchDrawer({ searchInput }) {
  const [channelMessages, setChannelMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [filteredChannelMessages, setFilteredChannelMessages] = useState([]);
  const [filteredUserMessages, setFilteredUserMessages] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    right: false,
  });

  const setChannel = (id, channelName) => {
    dispatch(setChannelInfo({ channelId: id }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };

  useEffect(() => {
    // getting messages from channels
    const getMessages = async () => {
      const channels = await getDocs(collection(db, "channels"));
      const users = await getDocs(collection(db, "users"));

      users.forEach(async (user) => {
        const msgs = await getDocs(collection(db, "dms", user.id, "messages"));
        msgs.forEach((msg) => {
          console.log(msg, msg.data());
          setUserMessages((prev) => [
            ...prev,
            {
              data: msg.data(),
              id: msg.id,
              channelId: user.id,
            },
          ]);
        });
      });

      channels.forEach(async (channel) => {
        // const channelName = await getDocs(collection(db, "channels"));
        // channelName.docs.find((item) => item.id === channel.id);
        const msgs = await getDocs(
          collection(db, "channels", channel.id, "messages")
        );
        msgs.forEach((msg) => {
          setChannelMessages((prev) => [
            ...prev,
            {
              data: msg.data(),
              id: msg.id,
              channelId: channel.id,
            },
          ]);
        });
      });
    };
    return () => {
      getMessages();
      return setChannelMessages([]);
    };
  }, [searchInput]);

  useEffect(() => {
    if (searchInput) {
      setFilteredChannelMessages(
        channelMessages.filter((item) =>
          item.data.message.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [channelMessages, searchInput]);

  useEffect(() => {
    if (searchInput) {
      setFilteredUserMessages(
        userMessages.filter((item) =>
          item.data.message.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [userMessages, searchInput]);

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
              <>
                <ListItem>
                  <ListItemText
                    sx={{ py: 0, minHeight: 32 }}
                    primary={"Channels"}
                  />
                </ListItem>
                {filteredChannelMessages.map((item, index) => (
                  <ListItem
                    onClick={() => setChannel(item.channelId)}
                    key={item + index}
                  >
                    <ListItemText
                      sx={{ py: 0, minHeight: 32 }}
                      primary={`${item.data.name} ===> ${item.data.message}`}
                    />
                  </ListItem>
                ))}
              </>
            )}
          </Box>
          <Divider />
          <Box>
            <ListItem>
              <ListItemText sx={{ py: 0, minHeight: 32 }} primary={"Users"} />
            </ListItem>
            {filteredUserMessages.map((item, index) => (
              <ListItem
                onClick={() => setChannel(item.channelId)}
                key={item + index}
              >
                <ListItemText
                  sx={{ py: 0, minHeight: 32 }}
                  primary={`${item.data.name} ===> ${item.data.message}`}
                />
              </ListItem>
            ))}
          </Box>
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
