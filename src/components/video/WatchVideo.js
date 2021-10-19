import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { styled } from "@mui/system";

import { useHistory } from "react-router";

import CloseIcon from "@mui/icons-material/Close";
import { HOME_ROUTE } from "../../constants/paths";
const ConatinerVideo = styled("div")(({ theme }) => ({
  backgroundColor: "#000",
  overflowX: "hidden",
  overflowY: "hidden",
  position: "relative",
}));
const Close = styled("div")(({ theme }) => ({
  color: "#fff",
}));

function WatchVideo() {
  const history = useHistory();
  const [esc, setEsc] = useState(false);

  useEffect(() => {
    if (esc) {
      history.push(HOME_ROUTE);
    }
  }, [esc, history]);
  const { id } = useParams();
  const video = id.slice(1);

  const opts = {
    width: "100%",
    height: "100vh",
    playerVars: {
      autoplay: 1,
    },
  };
  // const onReady = (event) => {
  //   event.target.pauseVideo();
  // };
  const onPlay = (event) => {
    event.target.playVideo();
  };
  return (
    <>
      <ConatinerVideo>
        <YouTube videoId={video} opts={opts} onPlay={onPlay} />
        <Close onClick={() => setEsc(true)}>
          Esc
          <CloseIcon />
        </Close>
      </ConatinerVideo>
    </>
  );
}
// onReady={onReady}

export default WatchVideo;
