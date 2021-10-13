import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import {
  CHANNELS_ROUTE,
  SIGN_IN_ROUTE,
  HOME_ROUTE,
} from "../../constants/paths";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { validateEmail, validatePassword } from "./validation";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loader/Loader";
import Alert from "../chat/Alert";

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
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("You typed incorrect credentials");

  const userData = {
    email,
    password,
    id: uuidv4(),
    isAdmin: false,
    isOnline: true,
  };

  const loggedUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (loggedUser) {
      history.push(CHANNELS_ROUTE);
    }
  }, [history, loggedUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let isResolved = false;
    if (
      email === "" ||
      password === "" ||
      rePassword === "" ||
      (!validateEmail(email) && !validatePassword(password))
    ) {
      setAlert(true);
      return null;
    }
    setLoader(true);
    const usrCollection = collection(db, "users");
    const auth = getAuth();
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        isResolved = true;
        addDoc(usrCollection, userData, userData.id);
        dispatch(setLoggedinUser(userData));
      })
      .catch((error) => {
        setAlert(true);
        setText(`We already have the user with email ${email}`);
        isResolved = false;
        console.log(new Error(error));
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
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Repeate Password"
                        type="password"
                        id="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to={SIGN_IN_ROUTE}>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
            <Alert alert={alert} setAlert={setAlert} text={text} />
          </ThemeProvider>
        </>
      )}
    </>
  );
}
