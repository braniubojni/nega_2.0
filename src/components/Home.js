import { Toolbar } from "@mui/material";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import MainCOntent from "./main/MainContent";
// import HomeAppBar from "./homeHeader/HomeAppBar";
import Navbar from "./header/Navbar";

function Home() {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <Toolbar />
      <div>
        <MainCOntent />
        <h1>Main content here</h1>
        <button onClick={() => history.push(CHANNELS_ROUTE)}>
          To channels
        </button>
        <button onClick={() => history.push(SIGN_IN_ROUTE)}>To Sign in</button>
      </div>
    </>
  );
}

export default Home;
