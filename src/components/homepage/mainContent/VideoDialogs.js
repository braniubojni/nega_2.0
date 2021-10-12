import { Button, Dialog } from "@mui/material";
import React from "react";
import YouTubeVideo from "./YouTube";

function VideoDialog(props) {
  const { handleClose, video, open } = props;
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth={"100vh"}
    >
      <YouTubeVideo video={video} />
      <Button onClick={handleClose}>aaaaaa</Button>
    </Dialog>
  );
}

export default VideoDialog;
