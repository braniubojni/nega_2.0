import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { styled } from "@mui/system";

const Li = styled("li")({
  display: "inline",
  cursor: "pointer",
  margin: "5px 0 5px",
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
  return <Li onClick={setChannel}># {channelName}</Li>;
}

export default Channel;
