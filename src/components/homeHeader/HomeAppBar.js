import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  CHANNELS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../../constants/paths";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { SLACK_MAIN } from "../../constants/colors";

export default function HomeAppBar() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);
  return (
    <Box sx={{ flexGrow: 1, background: SLACK_MAIN }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SLACK
          </Typography>
          {!loggedUser && (
            <Button color="inherit" onClick={() => history.push(SIGN_UP_ROUTE)}>
              SIGN UP
            </Button>
          )}

          <Button
            color="inherit"
            onClick={() =>
              !loggedUser
                ? history.push(SIGN_IN_ROUTE)
                : history.push(CHANNELS_ROUTE)
            }
          >
            {!loggedUser ? "Try for free" : "Open channels"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
