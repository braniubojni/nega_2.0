import { styled } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { useSelector } from "react-redux";
import { selectChannelId } from "../../redux/common/channel/selectors";
import EditMsg from "../chat/EditMsg";
import RemoveMsg from "../chat/RemoveMsg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router";

const HoverPopUp = styled("div")(() => ({
  transition: "all 0.2s",
}));
const Li = styled("li")(({ theme }) => ({
  position: "relative",
  display: "flex",
  height: "auto",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignItems: "center",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#80808024",
    transition: "all 0.2s",
  },
}));
const StyledMsg = styled("div")({});
const StyledTime = styled("span")(({ theme }) => ({
  position: "relative",
  fontSize: "0.718em",
  marginLeft: theme.spacing(1),
}));

function Message({ msgInfo, id, index, scrollToBottom }) {
  const [editedMsg, setEditedMsg] = useState(null);
  const [removeMsg, setRemoveMsg] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [hoverToggler, setHoverToggler] = useState(false);
  const { pathname } = useLocation();
  const channelId = useSelector(selectChannelId);
  const loggedUser = useSelector(selectLoggedInUser);
  const endRef = useRef(index);

  useEffect(() => {
    scrollToBottom(endRef);
  }, [endRef, scrollToBottom]);

  const onRemoveClose = useCallback(() => {
    setRemoveMsg(null);
  }, []);
  const onEditClose = useCallback(() => {
    setEditedMsg(null);
  }, []);
  return (
    <Li
      ref={endRef}
      onMouseEnter={() => setHoverToggler(true)}
      onMouseLeave={() => {
        setHoverToggler(false);
        setShowPopUp(false);
      }}
    >
      <div>
        <div>
          <strong>{msgInfo.name}</strong>
          <StyledTime>
            {moment(msgInfo.timestamp?.toDate().getTime()).format("lll")}
          </StyledTime>
        </div>

        <StyledMsg>{msgInfo.message}</StyledMsg>
      </div>
      {loggedUser?.email === msgInfo.name && hoverToggler && (
        <MoreVertIcon
          cursor="pointer"
          onClick={() => setShowPopUp((prev) => !prev)}
        />
      )}
      {showPopUp && (
        <HoverPopUp>
          <ModeEditIcon
            sx={{ marginRight: 0.45, "&:hover": { color: "#75e6da" } }}
            cursor="pointer"
            onClick={() => setEditedMsg(msgInfo)}
          />
          <DeleteForeverIcon
            sx={{ paddingLeft: 0.45, "&:hover": { color: "red" } }}
            cursor="pointer"
            onClick={() => setRemoveMsg({ channelId, id })}
          />
        </HoverPopUp>
      )}
      {!!removeMsg && (
        <RemoveMsg
          id={id}
          channelId={channelId}
          loggedUserId={loggedUser.id}
          msgInfo={msgInfo}
          location={pathname.includes("users")}
          onRemoveClose={onRemoveClose}
        />
      )}
      {!!editedMsg && (
        <EditMsg
          id={id}
          channelId={channelId}
          loggedUserId={loggedUser.id}
          location={pathname.includes("users")}
          msgInfo={msgInfo}
          onEditClose={onEditClose}
        />
      )}
    </Li>
  );
}

export default Message;
