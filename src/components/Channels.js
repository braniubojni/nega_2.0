import { getAuth, signOut } from "@firebase/auth";
import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { SIGN_IN_ROUTE } from "../constants/paths";
import { logOut } from "../redux/common/auth/actions";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import db from "../firebase";
import { useState } from "react";
import Channel from "./channels/Channel";
import Chat from "./chat/Chat";
import styled from "styled-components";

const ChatWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Channels() {
  const loggedUser = useSelector(selectLoggedInUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        history.push(SIGN_IN_ROUTE);
      })
      .catch((error) => {
        console.log(new Error(error));
      });
  };

  useEffect(() => {
    if (!loggedUser) {
      history.push(SIGN_IN_ROUTE);
    } else {
      onSnapshot(collection(db, "channels"), (snapshot) => {
        setChannels(snapshot.docs);
      });
    }
  }, [history, loggedUser]);

  const renderChannels = (channel) => {
    return (
      <Channel
        key={channel.id}
        id={channel.id}
        channelName={channel.data().channelName}
      />
    );
  };

  return (
    <div>
      <button onClick={() => history.push("/")}>HOME</button>
      <h1>Here is your channels {loggedUser && loggedUser?.email}</h1>

      <ul style={{ listStyle: "none" }}>
        {channels?.map((channel) => renderChannels(channel))}
      </ul>
      <ChatWrapper>
        <div>
          <Chat />
        </div>
      </ChatWrapper>
      <button onClick={handleSignOut}>Log out</button>
    </div>
  );
}

export default Channels;
