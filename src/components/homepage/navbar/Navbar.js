import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Tabs,
  Tab,
  Toolbar,
  Button,
  useMediaQuery,
  useTheme,
  createTheme,
} from "@mui/material";

import Dropdown from "./Dropdown";
import DrawerComponent from "./Drawer";
import Logo from "../../../logo/logo.svg";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/paths";
import { ThemeProvider } from "@mui/system";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#f6efe8",
      contrastText: "#1d1d1d",
    },
    secondary: {
      main: "#1d1d1d",
    },
  },
});

function Navbar() {
  const [value, setValue] = useState(0);

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* <ThemeProvider theme={Theme}> */}
      <AppBar sx={{ backgroundColor: "#f6efe8" }}>
        <Toolbar>
          {isSmallScreen ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography>
                <img src={Logo} width="100px" alt="slack_logo" />
              </Typography>
              <Tabs
                onChange={handleClickTab}
                indicatorColor="secondary"
                value={value}
              >
                <Tab disableRipple label={<Dropdown />} />
                <Tab disableRipple label="Enterprise" />
                <Tab disableRipple label="Recources" />
                <Tab disableRipple label="Pricing" />
              </Tabs>
              <Button>
                <Link to={SIGN_UP_ROUTE}>SIGN UP</Link>
              </Button>
              <Button>
                <Link to={SIGN_IN_ROUTE}>Try for free</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* </ThemeProvider> */}
    </>
  );
}

export default Navbar;
