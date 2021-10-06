import { useHistory } from "react-router";
import React, { useEffect, useState, useCallback } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../../constants/paths";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { validateEmail, validatePassword } from "./validation";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FormFlex, FormFlexItems, FormH1 } from "./signUpStyle";

function SignUp() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [isDirtyEmail, setIsDirtyEmail] = useState(false);
  const [isDirtyPassword, setIsDirtyPassword] = useState(false);
  const [isDirtyRePassword, setIsDirtyRePassword] = useState(false);
  const handleClickClearInput = () => {
    setPassword("");
    setPasswordError(false);
    setIsDirtyPassword(false);
  };

  const handleChangeIsDirtyEmail = useCallback(() => {
    setIsDirtyEmail(true);
  }, [isDirtyEmail]);
  const handleChangeIsDirtyPassword = useCallback(() => {
    setIsDirtyPassword(true);
  }, [isDirtyPassword]);
  const handleChangeIsDirtyRePassword = useCallback(() => {
    setIsDirtyRePassword(true);
  }, [isDirtyRePassword]);

  const userData = { email, password, id: uuidv4() };
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowRePassword = () => setShowRePassword(!showRePassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeRePassword = (event) => {
    setRePassword(event.target.value);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 6 && password.length < 10) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // if (validatePassword(password)) {
    //   setpasswordError(true);
    // } else {
    //   setpasswordError(false);
    // }
  }, [password]);

  useEffect(() => {
    if (password === rePassword && rePassword !== "") {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  }, [password, rePassword]);

  useEffect(() => {
    if (loggedUser) {
      history.push(CHANNELS_ROUTE);
    }
  }, [history, loggedUser]);

  const handleNewUser = (event) => {
    event.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
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
        });
    }
  };

  console.log(isDirtyPassword, passwordError);
  return (
    <>
      <Container maxWidth="sm">
        <FormFlex>
          <FormH1>On Sign up</FormH1>
          <form onSubmit={handleNewUser}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={email}
                value={email}
                onChange={handleChangeEmail}
                onBlur={handleChangeIsDirtyEmail}
                color={isDirtyEmail && emailError ? "success" : null}
                // style={
                //   isDirtyEmail && emailError
                //     ? {
                //         border: " 2px solid #22bb33",
                //         borderRadius: 1,
                //       }
                //     : null
                // }
                focused
                error={
                  isDirtyEmail && emailError
                    ? false
                    : isDirtyEmail && !emailError
                    ? true
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    {isDirtyEmail && emailError ? (
                      <CheckIcon color="success" />
                    ) : isDirtyEmail && !emailError ? (
                      <CloseIcon color="warning" />
                    ) : null}
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChangePassword}
                onBlur={handleChangeIsDirtyPassword}
                color={isDirtyPassword && passwordError ? "success" : null}
                error={
                  isDirtyPassword && passwordError
                    ? false
                    : isDirtyPassword && !passwordError
                    ? true
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    {isDirtyPassword && passwordError ? (
                      <CheckIcon color="success" />
                    ) : isDirtyPassword && !passwordError ? (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickClearInput}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <CloseIcon color="warning" />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-password">
                rePassword
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showRePassword ? "text" : "password"}
                value={rePassword}
                onChange={handleChangeRePassword}
                onBlur={handleChangeIsDirtyRePassword}
                color={isDirtyRePassword && passwordError ? "success" : null}
                error={
                  isDirtyRePassword && rePasswordError
                    ? false
                    : isDirtyRePassword && !rePasswordError
                    ? true
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    {isDirtyRePassword && passwordError ? (
                      <CheckIcon color="success" />
                    ) : isDirtyRePassword && !rePasswordError ? (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickClearInput}
                        onMouseDown={handleMouseDownRePassword}
                        edge="end"
                      >
                        <CloseIcon color="error" />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showRePassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </form>
          {/* If already has an account */}
          <div>Are you already signed up?</div>
          <Button
            variant="outlined"
            disabled={
              emailError && passwordError && rePasswordError ? false : true
            }
            onClick={() => history.push(SIGN_IN_ROUTE)}
          >
            Sign In
          </Button>
        </FormFlex>
      </Container>
    </>
  );
}

export default SignUp;
