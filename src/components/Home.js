import { Toolbar } from "@mui/material";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import HomeAppBar from "./homeHeader/HomeAppBar";

function Home() {
  const history = useHistory();
  return (
    <>
      <HomeAppBar />
      <Toolbar />
      <div>
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
