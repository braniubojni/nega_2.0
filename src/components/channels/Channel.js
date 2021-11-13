import { memo, useCallback, useState } from "react";
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
  const [showFullChannelName, setShowFullChannelName] = useState(true);
  const longChannelName = showFullChannelName
    ? {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden !important",
        textOverflow: "ellipsis",
      }
    : {};
  const onRemoveClose = useCallback(() => {
    setRemoveChannel(null);
  }, []);
  const setChannel = useCallback(() => {
    dispatch(setChannelInfo({ channelId: id, channelName }));
    closeBurger(false);
    history.push(`${CHANNELS_ROUTE}/${id}`);
  }, [channelName, closeBurger, dispatch, history, id]);
  return (
    <ListItemButton
      sx={{
        py: 0,
        minHeight: 32,
        ...longChannelName,
      }}
      onMouseEnter={() =>
        setShowRemove(true) || (!role && setShowFullChannelName(false))
      }
      onMouseLeave={() =>
        setShowRemove(false) || (!role && setShowFullChannelName(true))
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: 1,
          ...longChannelName,
        }}
      >
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
      </Box>
      <span>{channelName.length > 16 && showFullChannelName ? "..." : ""}</span>
      {showRemove && role && (
        <RemoveIcon cursor="pointer" onClick={() => setRemoveChannel(true)} />
      )}
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

export default memo(Channel);
