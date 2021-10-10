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
                <img src={Logo} width="100px"></img>
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
                <Button>Sign In</Button>
                <Button>Try for free</Button>
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
