import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
import { collection, limit, onSnapshot } from "@firebase/firestore";
import { setLoggedinUser } from "../../redux/common/auth/actions";
import { CHANNELS_ROUTE, SIGN_UP_ROUTE } from "../../constants/paths";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import Alert from "../dialogs/Alert";
import Loader from "../loader/Loader";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FlexContainer, ImgContainer, ImgLogo } from "./SignInStyle";
import logo from "../../../src/image/slack_logo.svg";

function SignIn() {
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
              snapshot.docs
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
          <Container maxWidth="sm">
            <FlexContainer>
              <ImgContainer>
                <ImgLogo src={logo} />
              </ImgContainer>
              <form onSubmit={handleExistingUser}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={usrEmail}
                  onChange={handleChangeUserEmail}
                  type="email"
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={usrPassword}
                    onChange={handleChangeUserPassword}
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
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </form>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: 2,
                  height: 50,
                }}
                onClick={() => history.push(SIGN_UP_ROUTE)}
              >
                Sign up
              </Button>
              {loggedInUser && (
                <Button
                  varinat="outlined"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    height: 50,
                  }}
                  onClick={() => history.push(CHANNELS_ROUTE)}
                >
                  to channels
                </Button>
              )}
            </FlexContainer>
          </Container>

          {alert && <Alert alert={alert} setAlert={setAlert} />}
        </>
      )}
    </>
  );
}

export default SignIn;
