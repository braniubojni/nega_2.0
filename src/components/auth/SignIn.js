import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
import { collection, limit, onSnapshot } from "@firebase/firestore";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import {
  CHANNELS_ROUTE,
  SIGN_UP_ROUTE,
  HOME_ROUTE,
} from "../../constants/paths";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { Link } from "react-router-dom";
import Alert from "../dialogs/Alert";
import Loader from "../loader/Loader";

import { Button, Container, TextField } from "@mui/material";
import { FlexContainer, ImgContainer, ImgLogo } from "./SignInStyle";
import logo from "../../../src/image/slack_logo.svg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to={HOME_ROUTE}>
        Slack NEGA
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [usrEmail, setUsrEmail] = useState("");
  const [usrPassword, setUsrPassword] = useState("");
  const loggedInUser = useSelector(selectLoggedInUser);
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeUserEmail = (e) => setUsrEmail(e.target.value);
  const handleChangeUserPassword = (e) => setUsrPassword(e.target.value);
  useEffect(() => {
    setLoader(true);
    if (loggedInUser) {
      setLoader(false);
      history.push(CHANNELS_ROUTE);
    }
    let timerId = setTimeout(() => setLoader(false), 1500);
    return () => {
      clearTimeout(timerId);
    };
  }, [history, loggedInUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let isResolved = false;
    setLoader(true);
    signInWithEmailAndPassword(auth, usrEmail, usrPassword)
      .then(() => {
        isResolved = true;
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
      })
      .catch((error) => {
        isResolved = false;
        setAlert((prev) => !prev);
        return new Error(error);
      })
      .finally(() => {
        setLoader(false);
        if (isResolved) {
          history.push(CHANNELS_ROUTE);
        }
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "primary.contrastText",
                  }}
                >
                  <svg
                    className="c-nav--footer__svgicon c-slackhash"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                        fill="#36C5F0"
                      ></path>
                      <path
                        d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                        fill="#2EB67D"
                      ></path>
                      <path
                        d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                        fill="#ECB22E"
                      ></path>
                      <path
                        d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                        fill="#E01E5A"
                      ></path>
                    </g>
                  </svg>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={usrEmail}
                    onChange={(e) => setUsrEmail(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={usrPassword}
                    onChange={(e) => setUsrPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link to={SIGN_UP_ROUTE} variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
          {alert && <Alert alert={alert} setAlert={setAlert} />}
        </>
      )}
    </>
  );
}
