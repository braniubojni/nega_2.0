import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SIGN_IN_ROUTE } from "../constants/paths";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import db from "../firebase";
import { useState } from "react";
import Chat from "./chat/Chat";
import ChannelArea from "./header/ChannelArea";

function Channels() {
  const loggedUser = useSelector(selectLoggedInUser);
  const history = useHistory();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!loggedUser) {
      history.push(SIGN_IN_ROUTE);
    } else {
      onSnapshot(collection(db, "channels"), (snapshot) =>
        setChannels(() => snapshot?.docs)
      );
    }
  }, [history, loggedUser]);

  return <ChannelArea channels={channels} Chat={Chat} />;
}

export default Channels;
