import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>This should be the home page</h1>
      <button onClick={history.push(CHANNELS_ROUTE)}>To channels</button>
      <button onClick={history.push(SIGN_IN_ROUTE)}>To Sign in</button>
    </div>
  );
}

export default Home;
