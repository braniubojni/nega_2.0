import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetRole } from "../helpers/customHooks/useGetRole";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleRemove, setToggleRemove] = useState();
  const role = useGetRole();
  const setChannel = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItemButton
      sx={{ "&:hover": { backgroundColor: "unset" } }}
      onMouseEnter={() => setToggleRemove(true)}
      onMouseOut={() => setToggleRemove(false)}
    >
      <Box sx={{ fontSize: 12, mr: 1 }}>
        <FontAwesomeIcon icon={faHashtag} className="faHashtag" />
      </Box>

      <ListItemText
        onClick={setChannel}
        sx={{ cursor: "pointer" }}
        primary={channelName}
      />
      {toggleRemove && role && (
        <RemoveIcon sx={{ position: "absolute", right: "-100%" }} />
      )}
    </ListItemButton>
  );
}

export default Channel;
