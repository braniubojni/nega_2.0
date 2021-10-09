import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import ChannelArea from "./header/ChannelArea";
import { Toolbar } from "@mui/material";

// yst redux -i kimananq te SignIn exaca te piti lini
// ev yst dran kimananq te renderi

function Home() {
  return (
    <div>
      <ChannelArea />
    </div>
  );
}

export default Home;
