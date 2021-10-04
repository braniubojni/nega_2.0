import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/Home";
import Channels from "./components/Channels";
import { useDispatch } from "react-redux";
import { setLoggedinUser } from "./redux/common/auth/actions";
import {
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  CHANNELS_ROUTE,
} from "./constants/paths";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { collection, onSnapshot } from "@firebase/firestore";
import Loader from "./components/loader/Loader";
import styled from "styled-components";
import db from "./firebase";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const auth = getAuth();
  const timer = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  };

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
          setLoader(false);
        });
      }
    });
  }, [dispatch, auth]);

  return (
    <>
      <Router>
        {loader ? (
          <>
            <Loader loader={loader} />
            {timer()}
          </>
        ) : (
          <Switch>
            <Route exact path={HOME_ROUTE}>
              <Home />
            </Route>
            <Route path={SIGN_UP_ROUTE}>
              <Auth />
            </Route>
            <Route path={SIGN_IN_ROUTE}>
              <Auth />
            </Route>
            <Route exact path={CHANNELS_ROUTE}>
              <Channels />
            </Route>
            <Route exact path={`${CHANNELS_ROUTE}/:id`}>
              <Channels />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
