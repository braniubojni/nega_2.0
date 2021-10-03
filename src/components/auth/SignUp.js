import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../../constants/paths";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";

// need validation form

function SignUp() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState(""); for checking is the password the same
  const userData = { email, password, id: uuidv4() };
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      history.push(CHANNELS_ROUTE);
    }
  }, [history, loggedUser]);

  const handleNewUser = (event) => {
    event.preventDefault();
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
      });
  };
  return (
    <>
      <h1>On Sign up</h1>
      <form onSubmit={handleNewUser}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* If already has an account */}
      <div>Are you already signed up?</div>
      <button onClick={() => history.push(SIGN_IN_ROUTE)}>Sign In</button>
    </>
  );
}

export default SignUp;
