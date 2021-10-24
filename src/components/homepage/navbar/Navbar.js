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
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import Logo from "../../../logo/logo.svg";
import Logo_2 from "../../../logo/logo_2.svg";

import { Box } from "@mui/system";
import Buttons from "../../../shared/ButtonTemplate";
import { LIGHT_ORANGE } from "../../../constants/colors";
import { BLACK } from "../../../constants/colors";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import {
  ENTERPRISE_ROUTE,
  HOME_ROUTE,
  PRICING,
  RESOURCES,
} from "../../../constants/paths";
import Dropdown from "./Dropdown";

function Navbar() {
  const widthWindow = useWindowResize();
  const [value, setValue] = useState(0);

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ backgroundColor: LIGHT_ORANGE, width: "100%" }}>
          {isSmallScreen ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography sx={{ mr: "20px", mt: "10px" }}>
                {widthWindow > 1024 ? (
                  <Link to={HOME_ROUTE} style={{ textDecoration: "none" }}>
                    <img src={Logo} width="100px" alt="slack_logo" />
                  </Link>
                ) : (
                  <Link to={HOME_ROUTE} style={{ textDecoration: "none" }}>
                    <img src={Logo_2} width="100px" alt="slack_logo" />
                  </Link>
                )}
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
                      <span style={{ color: BLACK }}>
                        <Dropdown />
                      </span>
                    }
                  />

                  <Tab
                    disableRipple
                    label={
                      <span style={{ color: BLACK }}>
                        <Link
                          to={ENTERPRISE_ROUTE}
                          style={{
                            color: BLACK,
                            textDecoration: "none",
                          }}
                        >
                          Enterprise
                        </Link>
                      </span>
                    }
                  />
                  <Tab
                    disableRipple
                    label={
                      <Link
                        to={RESOURCES}
                        style={{
                          color: BLACK,
                          textDecoration: "none",
                        }}
                      >
                        <span style={{ color: BLACK }}>RESOURCES</span>
                      </Link>
                    }
                  />
                  <Tab
                    disableRipple
                    label={
                      <span style={{ color: BLACK }}>
                        <Link
                          to={PRICING}
                          style={{
                            color: BLACK,
                            textDecoration: "none",
                          }}
                        >
                          Pricing
                        </Link>
                      </span>
                    }
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
