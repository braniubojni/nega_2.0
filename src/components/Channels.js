import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import db from "../firebase";
import { useState } from "react";
import Channel from "./channels/Channel";
import Chat from "./chat/Chat";
import { styled } from "@mui/system";
import LogOutDialog from "./dialogs/LogOutDialog";

const ChatWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const Ul = styled("ul")({
  display: "inline-flex",
  flexDirection: "column",
});

function Channels() {
  const loggedUser = useSelector(selectLoggedInUser);
  const history = useHistory();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!loggedUser) {
      history.push(SIGN_IN_ROUTE);
    } else {
      onSnapshot(collection(db, "channels"), (snapshot) =>
        setChannels(snapshot?.docs)
      );
    }
  }, [history, loggedUser]);

  const renderChannels = (channel) => {
    return (
      <Channel
        key={channel.id}
        id={channel.id}
        channelName={channel?.data().channelName}
      />
    );
  };

  return (
    <div>
      <button>
        <Link to={HOME_ROUTE}>HOME</Link>
      </button>
      <h1>Here is your channels {loggedUser && loggedUser?.email}</h1>

      <Ul>{channels?.map((channel) => renderChannels(channel))}</Ul>
      <ChatWrapper>
        <div>
          <Chat />
        </div>
      </ChatWrapper>
      <LogOutDialog />
    </div>
  );
}

export default Channels;
