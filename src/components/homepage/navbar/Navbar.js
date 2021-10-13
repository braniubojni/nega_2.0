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
  Container,
} from "@mui/material";

import Dropdown from "./Dropdown";
import DrawerComponent from "./Drawer";
import Logo from "../../../logo/logo.svg";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/paths";
import { styled } from "@mui/system";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
const FlexCOntainer = styled("div")(({ theme }) => ({
  width: 1220,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
function Navbar() {
  const windowWidth = useWindowResize();
  const [value, setValue] = useState(0);

  const handleClickTab = (evt, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container maxWidth="lg">
        <AppBar color="secondary">
          <Toolbar>
            {isSmallScreen ? (
              <DrawerComponent />
            ) : (
              <>
                <FlexCOntainer>
                  <Typography>
                    <img src={Logo} width="100px" alt="slack_logo" />
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
                  <div>
                    <Button>
                      <Link to={SIGN_UP_ROUTE}>SIGN UP</Link>
                    </Button>
                    <Button>
                      <Link to={SIGN_IN_ROUTE}>Try for free</Link>
                    </Button>
                  </div>
                </FlexCOntainer>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
}

export default Navbar;
