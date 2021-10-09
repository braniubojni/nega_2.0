import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { styled } from "@mui/system";
import TagIcon from "@mui/icons-material/Tag";
import { ListItem, ListItemText } from "@mui/material";

const Li = styled("li")({
  margin: "5px 0 5px",
  display: "flex",
});
const ChannelName = styled("span")({
  fontSize: "1.2em",
  cursor: "pointer",
});

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };
  return (
    <ListItem onClick={setChannel}>
      <TagIcon /> <ListItemText cursor="pointer" primary={channelName} />
    </ListItem>
  );
}

export default Channel;
