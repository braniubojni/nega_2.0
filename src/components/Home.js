import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../constants/paths";
import { selectLoggedInUser } from "../redux/common/auth/selectors";
import Loader from "./loader/Loader";

// yst redux -i kimananq te SignIn exaca te piti lini
// ev yst dran kimananq te renderi

function Home() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);

  return (
    <header style={{ display: "flex" }}>
      <p>Icon</p>
      <h1>I am header</h1>
      <button
        onClick={() =>
          !loggedUser
            ? history.push(SIGN_IN_ROUTE)
            : history.push(CHANNELS_ROUTE)
        }
      >
        {!loggedUser ? "Try for free" : "Open channels"}
      </button>
    </header>
  );
}

export default Home;
