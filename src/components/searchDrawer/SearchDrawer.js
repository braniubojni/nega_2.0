import { Fragment, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { collection, getDocs, doc, getDoc } from "@firebase/firestore";
import db from "../../firebase";
import { Toolbar } from "@mui/material";
import MessageLoader from "../loader/MessageLoader";
import { useDispatch } from "react-redux";
import {
  removeChannelInfo,
  setChannelInfo,
} from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE, USERS_ROUTE } from "../../constants/paths";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { getExistingUsers } from "../helpers/handlers";

export default function SearchDrawer({ searchInput }) {
  const [channelMessages, setChannelMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [filteredChannelMessages, setFilteredChannelMessages] = useState([]);
  const [filteredUserMessages, setFilteredUserMessages] = useState([]);
  const [state, setState] = useState({
    right: false,
  });
  const currentUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const getChannelMessages = useCallback(async () => {
    const channels = await getDocs(collection(db, "channels"));
    channels.forEach(async (channel) => {
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
  }, []);
  const getUserMessages = useCallback(async () => {
    const existUsers = await getExistingUsers({
      currentUid: currentUser?.id,
    });
    existUsers.forEach(async (dm) => {
      const msgs = await getDocs(collection(db, "dms", dm, "messages"));
      msgs.forEach((msg) => {
        setUserMessages((prev) =>
          prev?.id !== msg.id
            ? [
                ...prev,
                {
                  data: msg.data(),
                  id: msg.id,
                  channelId: msg.id,
                },
              ]
            : [...prev]
        );
      });
    });
  }, [currentUser]);
  const getFilteredChannelMessages = useCallback(() => {
    if (searchInput) {
      setFilteredChannelMessages(
        channelMessages.filter((item) =>
          item.data.message.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [channelMessages, searchInput]);
  const getFilteredUserMessages = useCallback(() => {
    if (searchInput) {
      setFilteredUserMessages(
        userMessages.filter((item) =>
          item.data.message.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput, userMessages]);

  async function setChannel(id) {
    const channel = await getDoc(doc(db, "channels", id));
    dispatch(
      setChannelInfo({ channelId: id, channelName: channel.data().channelName })
    );
    history.push(`${CHANNELS_ROUTE}/${id}`);
  }

  const setDM = ({
    item: {
      data: { name, path, userName },
    },
  }) => {
    // need to implement "got to that PM"
    console.log(name, userName);
    dispatch(
      setChannelInfo({
        channelId: path,
        channelName: userName,
      })
    );
    history.push(`${USERS_ROUTE}/${path}`);
  };

  useEffect(() => {
    getChannelMessages();
    getUserMessages();
    return () => {
      getUserMessages();
      getChannelMessages();
      return setChannelMessages([]);
    };
  }, [getChannelMessages, getUserMessages]);

  useEffect(() => {
    getFilteredChannelMessages();
  }, [getFilteredChannelMessages]);

  useEffect(() => {
    getFilteredUserMessages();
  }, [getFilteredUserMessages]);

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
                {filteredChannelMessages
                  .filter(
                    (v, i, a) =>
                      a.findIndex(
                        (t) => JSON.stringify(t) === JSON.stringify(v)
                      ) === i
                  )
                  .map((item, index) => (
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
            {!filteredUserMessages ? (
              <MessageLoader />
            ) : (
              <>
                <ListItem>
                  <ListItemText
                    sx={{ py: 0, minHeight: 32 }}
                    primary={"Users"}
                  />
                </ListItem>
                {filteredUserMessages
                  .filter(
                    (v, i, a) =>
                      a.findIndex(
                        (t) => JSON.stringify(t) === JSON.stringify(v)
                      ) === i
                  )
                  .map((item, index) => (
                    <ListItem
                      onClick={() => setDM({ item })}
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
