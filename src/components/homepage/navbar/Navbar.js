import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Tabs,
  Tab,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Dropdown from "./Dropdown";
import DrawerComponent from "./Drawer";
import Logo from "../../../logo/logo.svg";

import { Box } from "@mui/system";
import Buttons from "../../../shared/ButtonTemplate";
import { LIGHT_ORANGE } from "../../../constants/colors";
import { BLACK } from "../../../constants/colors";

function Navbar() {
  const [value, setValue] = useState(0);

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ backgroundColor: LIGHT_ORANGE }}>
          {isSmallScreen ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography sx={{ mr: "20px", mt: "10px" }}>
                <img src={Logo} width="100px" alt="slack_logo" />
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Tabs
                  TabIndicatorProps={{ style: { background: "black" } }}
                  onChange={handleClickTab}
                  value={value}
                >
                  <Tab
                    disableRipple
                    label={<span style={{ color: BLACK }}>{<Dropdown />}</span>}
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: BLACK }}>Enterprise</span>}
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: BLACK }}>Recources</span>}
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: BLACK }}>Pricing</span>}
                  />
                </Tabs>
              </Box>
              <Buttons />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
