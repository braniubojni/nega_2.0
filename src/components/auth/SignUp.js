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
import { FormFlex, FormH1 } from "./signUpStyle";

function SignUp() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);

  //! email code start
  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const [emailError, setEmailError] = useState(false);
  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);
  const [isDirtyEmail, setIsDirtyEmail] = useState(false);
  const handleChangeIsDirtyEmail = useCallback(() => {
    setIsDirtyEmail(true);
  }, [isDirtyEmail]);
  //! emali code end

  //! password code start
  const [password, setPassword] = useState("");
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [passwordError, setPasswordError] = useState(false);
  useEffect(() => {
    if (validatePassword(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);
  const [isDirtyPassword, setIsDirtyPassword] = useState(false);
  const handleChangeIsDirtyPassword = useCallback(() => {
    setIsDirtyPassword(true);
  }, [isDirtyPassword]);
  const handleClickClearInput = () => {
    setPassword("");
    setPasswordError(false);
    setIsDirtyPassword(false);
  };
  //! password code end

  //! rePassword code start
  const [rePassword, setRePassword] = useState("");
  const handleChangeRePassword = (event) => {
    setRePassword(event.target.value);
  };
  const handleClickClearRePasswordInput = () => setRePassword("");
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowRePassword = () => setShowRePassword(!showRePassword);
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };
  const [rePasswordError, setRePasswordError] = useState(false);
  useEffect(() => {
    if (password === rePassword && rePassword !== "") {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  }, [password, rePassword]);

  const [isDirtyRePassword, setIsDirtyRePassword] = useState(false);
  const handleChangeIsDirtyRePassword = useCallback(() => {
    setIsDirtyRePassword(true);
  }, [isDirtyRePassword]);

  //! rePassword code end

  const userData = { email, password, id: uuidv4() };
  const dispatch = useDispatch();

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

  return (
    <>
      <Container maxWidth="sm">
        <FormFlex>
          <FormH1>On Sign up</FormH1>
          <form onSubmit={handleNewUser}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-Email"
                type={email}
                value={email}
                onChange={handleChangeEmail}
                onBlur={handleChangeIsDirtyEmail}
                color={isDirtyEmail && emailError ? "success" : null}
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
                label="Email"
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

                    <div style={{ marginLeft: 8 }}>
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
                      ) : null}
                    </div>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-rePassword">
                Repeat
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
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRePassword}
                      onMouseDown={handleMouseDownRePassword}
                      edge="end"
                    >
                      {showRePassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                    <div style={{ marginLeft: 8 }}>
                      {isDirtyRePassword && rePasswordError ? (
                        <CheckIcon color="success" />
                      ) : isDirtyRePassword && !rePasswordError ? (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickClearRePasswordInput}
                          onMouseDown={handleMouseDownRePassword}
                          edge="end"
                        >
                          <CloseIcon color="warning" />
                        </IconButton>
                      ) : null}
                    </div>
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
