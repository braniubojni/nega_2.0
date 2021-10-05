import { styled } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
const HoverPopUp = styled("div")(({ theme }) => ({
  position: "absolute",
  top: -20,
  right: 0,
  transition: "all 0.2s",
}));
const Li = styled("li")(({ theme }) => ({
  position: "relative",
  gap: theme.spacing(1),
  display: "flex",
  height: theme.spacing(2),
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignItems: "center",
  borderRadius: theme.spacing(1),
  "&:hover": {
    color: "red",
  },
}));

function Message({ msgInfo }) {
  const [popup, setPopup] = useState(false);
  return (
    <Li>
      {/* <img src={msgInfo.photoURL} alt="avatar" /> */}
      <span>{msgInfo.name}</span>
      <span>{msgInfo.message}</span>
      {popup && (
        <HoverPopUp>
          <ModeEditIcon />
          <DeleteForeverIcon />
        </HoverPopUp>
      )}
    </Li>
  );
}

export default Message;
