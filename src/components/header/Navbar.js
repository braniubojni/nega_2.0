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
} from "@mui/material";

import Dropdown from "./Dropdown";
import DrawerComponent from "./Drawer";
import Logo from "../../Logo/logo.svg";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../constants/paths";

function Navbar() {
  const [value, setValue] = useState(0);
  const [selectValue, setSelectValue] = useState("");

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar color="secondary">
        <Toolbar>
          {isSmallScreen ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography>
                <img src={Logo} width="100px" />
              </Typography>
              <Tabs
                onChange={handleClickTab}
                indicatorColor="primary"
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
    </>
  );
}

export default Navbar;
