import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../../constants/paths";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { validateEmail, validatePassword } from "./validation";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loader/Loader";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const userData = { email, password, id: uuidv4() };

  const loggedUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (password === rePassword && rePassword !== "") {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }, [password, rePassword]);

  useEffect(() => {
    if (loggedUser) {
      history.push(CHANNELS_ROUTE);
    }
  }, [history, loggedUser]);

  const handleNewUser = (event) => {
    event.preventDefault();
    setLoader(true);
    if (validateEmail(email) && validatePassword(password)) {
      setAlert((prev) => !prev);
    } else {
      const usrCollection = collection(db, "users");
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          addDoc(usrCollection, userData, userData.id);
          dispatch(setLoggedinUser(userData));
          history.push("/");
        })
        .catch((error) => {
          console.log(new Error(error));
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <>
          <h1>On Sign up</h1>
          <form onSubmit={handleNewUser}>
            Email:
            <input
              type="text"
              value={email}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              value={rePassword}
              placeholder={"Retype the password"}
              onChange={(e) => setRePassword(e.target.value)}
            />
            {trigger ? (
              <CheckIcon color="success" fontSize="large" />
            ) : (
              <CloseIcon color="error" />
            )}
            <input type="submit" value="Submit" />
          </form>
          <div>Are you already signed up?</div>
          <button onClick={() => history.push(SIGN_IN_ROUTE)}>Sign In</button>
        </>
      )}
    </>
  );
}

export default SignUp;
