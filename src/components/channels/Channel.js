import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { ListItem, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const setChannel = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItem onClick={setChannel}>
      <Box sx={{ fontSize: 12, mr: 1 }}>
        <FontAwesomeIcon
          icon={faHashtag}
          className="faHashtag"
        ></FontAwesomeIcon>
      </Box>
      <ListItemText sx={{ cursor: "pointer" }} primary={channelName} />
    </ListItem>
  );
}

export default Channel;
