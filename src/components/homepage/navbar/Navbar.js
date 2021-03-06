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
import { useHistory } from "react-router";
import DrawerComponent from "./Drawer";
import Logo from "../../../logo/logo.svg";
import Logo_2 from "../../../logo/logo_2.svg";

import { Box } from "@mui/system";
import Buttons from "../../../shared/Buttons";
import { LIGHT_ORANGE } from "../../../constants/colors";
import { BLACK } from "../../../constants/colors";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import {
  ENTERPRISE_ROUTE,
  HOME_ROUTE,
  PRICING_ROUTE,
  RESOURCES_ROUTE,
} from "../../../constants/paths";
import Dropdown from "./Dropdown";

function Navbar() {
  const widthWindow = useWindowResize();
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };
  const pushToPage = (link) => {
    history.push(link);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar sx={{ backgroundColor: "black" }}>
        <Toolbar
          sx={{
            backgroundColor: LIGHT_ORANGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isSmallScreen ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>
              {widthWindow > 1024 ? (
                <Typography sx={{ mr: "20px", mt: "10px", cursor: "pointer" }}>
                  <img
                    src={Logo}
                    width="100px"
                    alt="slack_logo"
                    onClick={() => pushToPage(HOME_ROUTE)}
                  />
                </Typography>
              ) : (
                <Typography sx={{ mr: "20px", mt: "10px", cursor: "pointer" }}>
                  <img
                    src={Logo_2}
                    width="100px"
                    alt="slack_logo"
                    onClick={() => pushToPage(HOME_ROUTE)}
                  />
                </Typography>
              )}
              <Box sx={{ display: "flex" }}>
                <Tabs
                  TabIndicatorProps={{ style: { background: "black" } }}
                  onChange={handleClickTab}
                  value={value}
                >
                  <Tab
                    disableRipple
                    label={
                      <span style={{ color: BLACK }}>
                        <Dropdown />
                      </span>
                    }
                  />

                  <Tab
                    disableRipple
                    onClick={() => pushToPage(ENTERPRISE_ROUTE)}
                    label={<span style={{ color: BLACK }}>Enterprise</span>}
                  />
                  <Tab
                    disableRipple
                    onClick={() => pushToPage(RESOURCES_ROUTE)}
                    label={<span style={{ color: BLACK }}>Resources</span>}
                  />
                  <Tab
                    disableRipple
                    onClick={() => pushToPage(PRICING_ROUTE)}
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
