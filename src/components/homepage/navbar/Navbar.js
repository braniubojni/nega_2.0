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
import Logo from "../../../logo/logo.svg";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/paths";
import { Box } from "@mui/system";

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
        <Toolbar sx={{ backgroundColor: "#f6efe8" }}>
          {isSmallScreen ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography>
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
                    label={
                      <span style={{ color: "#1d1d1d" }}>{<Dropdown />}</span>
                    }
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: "#1d1d1d" }}>Enterprise</span>}
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: "#1d1d1d" }}>Recources</span>}
                  />
                  <Tab
                    disableRipple
                    label={<span style={{ color: "#1d1d1d" }}>Pricing</span>}
                  />
                </Tabs>
              </Box>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Button variant="outlined">
                  <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
                </Button>
                <Button>
                  <Link to={SIGN_IN_ROUTE}>Try for free</Link>
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
