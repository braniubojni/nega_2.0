import React from "react";
import YouTube from "react-youtube";
import { styled } from "@mui/system";

const VideoStyled = styled("div")(({ theme }) => ({
  width: "100vh",
  height: "100%",
}));

function YouTubeVideo(props) {
  const opts = {
    width: "450px",
    height: "450px",
    playerVars: {
      autoplay: 1,
    },
  };
  const { video } = props;
  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <>
      <VideoStyled style={{}}>
        <YouTube videoId={video} opts={opts} onReady={onReady} />;
      </VideoStyled>
    </>
  );
}
export default YouTubeVideo;
