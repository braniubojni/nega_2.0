import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { ListItem, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetRole } from "../helpers/customHooks/useGetRole";
import RemoveChannel from "../chat/RemChannel";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useGetRole();
  const [removeChannel, setRemoveChannel] = useState(null);
  const onRemoveClose = () => {
    setRemoveChannel(null);
  };
  const setChannel = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItem sx={{ "&:hover": { backgroundColor: "unset" } }}>
      <Box sx={{ fontSize: 12, mr: 1 }}>
        <FontAwesomeIcon icon={faHashtag} className="faHashtag" />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "0 10px",
          justifyContent: "space-between",
        }}
      >
        <ListItemText
          onClick={setChannel}
          sx={{ cursor: "pointer" }}
          primary={channelName}
        />
      </Box>
      {role && (
        <RemoveIcon cursor="pointer" onClick={() => setRemoveChannel(true)} />
      )}
      {removeChannel && (
        <RemoveChannel
          onRemoveClose={onRemoveClose}
          channelName={channelName}
          channelId={id}
        />
      )}
    </ListItem>
  );
}

export default Channel;
