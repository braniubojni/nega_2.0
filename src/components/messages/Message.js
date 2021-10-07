import { styled } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { useSelector } from "react-redux";
import { handleDelete } from "../helpers/handlers";
import { selectChannelId } from "../../redux/common/channel/selectors";
import EditMsg from "../dialogs/EditMsg";
import RemoveMsg from "../dialogs/RemoveMsg";
import { useState } from "react";
const HoverPopUp = styled("div")(() => ({
  position: "absolute",
  top: -15,
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
}));
const StyledSpan = styled("span")({
  "&:hover": {
    color: "red",
  },
});

function Message({ msgInfo, id }) {
  const [editedMsg, setEditedMsg] = useState(null);
  const [removeMsg, setRemoveMsg] = useState(null);
  const channelId = useSelector(selectChannelId);
  const loggedUser = useSelector(selectLoggedInUser);
  const onRemoveClose = () => {
    setRemoveMsg(null);
  };
  const onEditClose = () => {
    setEditedMsg(null);
  };
  return (
    <Li>
      {/* <img src={msgInfo.photoURL} alt="avatar" /> */}
      <span>
        <strong>{msgInfo.name}</strong>
      </span>
      <StyledSpan>{msgInfo.message}</StyledSpan>
      <span>{moment(msgInfo.timestamp?.toDate().getTime()).format("lll")}</span>
      {loggedUser.email === msgInfo.name && (
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
          msgInfo={removeMsg}
          onRemoveClose={onRemoveClose}
        />
      )}
      {!!editedMsg && (
        <EditMsg
          id={id}
          channelId={channelId}
          msgInfo={msgInfo}
          onEditClose={onEditClose}
        />
      )}
    </Li>
  );
}

export default Message;
