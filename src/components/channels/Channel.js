import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetRole } from "../helpers/customHooks/useGetRole";
import RemoveChannel from "../chat/Remove";
import { Box } from "@mui/system";
import { handleChannelRemove } from "../helpers/handlers";

function Channel({ id, channelName, closeBurger }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useGetRole();
  const [removeChannel, setRemoveChannel] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const onRemoveClose = () => {
    setRemoveChannel(null);
  };
  const setChannel = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
    closeBurger(false);
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItemButton
      sx={{ py: 0, minHeight: 32 }}
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon sx={{ color: "inherit", minWidth: 23 }}>
          <FontAwesomeIcon icon={faHashtag} className="faHashtag" />
        </ListItemIcon>
        <ListItemText
          onClick={setChannel}
          primary={channelName}
          primaryTypographyProps={{
            fontSize: "1rem",
            fontWeight: "medium",
          }}
        />
        {showRemove && role && (
          <RemoveIcon cursor="pointer" onClick={() => setRemoveChannel(true)} />
        )}
      </Box>
      {removeChannel && (
        <RemoveChannel
          onRemoveClose={onRemoveClose}
          name={channelName}
          id={id}
          removeFunc={handleChannelRemove}
        />
      )}
    </ListItemButton>
  );
}

export default Channel;
