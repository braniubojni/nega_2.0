import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import { CHANNELS_ROUTE, SIGN_UP_ROUTE } from "../../constants/paths";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import Alert from "../dialogs/Alert";
import Loader from "../loader/Loader";
import SignInCopy from "./SignInCopy";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [usrEmail, setUsrEmail] = useState("");
  const [usrPassword, setUsrPassword] = useState("");
  const loggedInUser = useSelector(selectLoggedInUser);
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      history.push(CHANNELS_ROUTE);
    }
  }, [history, loggedInUser]);

  const handleExistingUser = (event) => {
    event.preventDefault();
    setLoader(true);
    signInWithEmailAndPassword(auth, usrEmail, usrPassword)
      .then(() => {
        const currentUser = auth.currentUser;
        onSnapshot(collection(db, "users"), (snapshot) => {
          dispatch(
            setLoggedinUser(
              snapshot?.docs
                .map((doc) => doc.data())
                .find((user) => user.email === currentUser.email)
            )
          );
        });
        history.push(CHANNELS_ROUTE);
      })
      .catch((error) => {
        setAlert((prev) => !prev);
        return new Error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <>
          <SignInCopy />
          <h1>On Sign In</h1>
          <form onSubmit={handleExistingUser}>
            <label>
              Email:
              <input
                type="email"
                value={usrEmail}
                onChange={(e) => setUsrEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={usrPassword}
                onChange={(e) => setUsrPassword(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={() => history.push(SIGN_UP_ROUTE)}>Sign up</button>
          {loggedInUser && (
            <button onClick={() => history.push(CHANNELS_ROUTE)}>
              to channels
            </button>
          )}

          {alert && <Alert alert={alert} setAlert={setAlert} />}
        </>
      )}
    </>
  );
}

export default SignIn;
