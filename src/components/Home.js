import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import Appbar from "../components/header/Appbar";
import AppbarDrawer from "../components/header/AppbarDrawer";
import { Toolbar } from "@mui/material";

// yst redux -i kimananq te SignIn exaca te piti lini
// ev yst dran kimananq te renderi

function Home() {
  return (
    <header style={{ display: "flex" }}>
      <AppbarDrawer />
    </header>
  );
}

export default Home;
