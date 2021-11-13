import { memo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Auth from "./components/auth/Auth";
import Home from "./components/homepage/Home";
import Channels from "./components/channels/Channels";
import { useDispatch } from "react-redux";
import { setLoggedinUser } from "./redux/common/auth/actions";
import {
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  CHANNELS_ROUTE,
  USERS_ROUTE,
  PRICING_ROUTE,
  ENTERPRISE_ROUTE,
  RESOURCES_ROUTE,
} from "./constants/paths";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "./firebase";
function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const currentUser = auth.currentUser;
      if (user) {
        onSnapshot(collection(db, "users"), (snapshot) => {
          dispatch(
            setLoggedinUser(
              snapshot.docs
                .map((doc) => doc.data())
                .find((user) => user.email === currentUser.email)
            )
          );
        });
      }
    });
  }, [dispatch, auth]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={HOME_ROUTE} children={<Home />} />
          <Route exact path={ENTERPRISE_ROUTE} children={<Home />} />
          <Route exact path={RESOURCES_ROUTE} children={<Home />} />
          <Route exact path={PRICING_ROUTE} children={<Home />} />

          <Route exact path={SIGN_UP_ROUTE} children={<Auth />} />
          <Route exact path={SIGN_IN_ROUTE} children={<Auth />} />

          <Route exact path={CHANNELS_ROUTE} children={<Channels />} />
          <Route exact path={`${CHANNELS_ROUTE}/:id`} children={<Channels />} />
          <Route exact path={`${USERS_ROUTE}/:id`} children={<Channels />} />

          <Redirect to={HOME_ROUTE} />
        </Switch>
      </Router>
    </>
  );
}

export default memo(App);
