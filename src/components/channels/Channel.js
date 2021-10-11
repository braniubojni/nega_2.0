import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import TagIcon from "@mui/icons-material/Tag";
import { ListItem, ListItemText } from "@mui/material";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const setChannel = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItem onClick={setChannel}>
      <TagIcon />{" "}
      <ListItemText sx={{ cursor: "pointer" }} primary={channelName} />
    </ListItem>
  );
}

export default Channel;
