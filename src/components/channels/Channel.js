import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { CHANNELS_ROUTE } from "../../constants/paths";

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
    <li style={{ cursor: "pointer", margin: "5px 0 5px" }} onClick={setChannel}>
      # {channelName}
    </li>
  );
}

export default Channel;
