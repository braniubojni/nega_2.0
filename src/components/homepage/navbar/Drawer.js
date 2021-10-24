import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../logo/logo.svg";
import SmallDropdown from "./SmallDropdown";
import Buttons from "../../../shared/Buttons";

import {
  Drawer,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import useWindowResize from "../../helpers/customHooks/useWindowResize";

function DrawerComponent() {
  const widthWindow = useWindowResize();
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerToggling = () => {
    setOpenDrawer(false);
  };

  const menuItems = ["Product", "Enterprise", "Recources", "Pricing"];

  return (
    <>
      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={handleDrawerToggling}
        sx={{ width: "100% " }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100% ",
          }}
        >
          <Box sx={{ ml: "20px", mt: "20px" }}>
            <Typography>
              <img src={Logo} width="140px" alt="slack_logo" />
            </Typography>
          </Box>
          <Box sx={{ mr: "25px", mt: "15px" }}>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <CloseIcon background="black" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          {menuItems.map((item, index) => {
            return index === 0 ? (
              <SmallDropdown key={item} />
            ) : (
              <ListItem key={item}>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            );
          })}
        </Box>

        <Box sx={{ mx: 5, my: 5, h: "5vh" }}>
          <Buttons />
        </Box>
      </Drawer>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {widthWindow > 1024 ? (
          <Box sx={{ ml: "20px", mt: "15px" }}>
            <Typography>
              <img src={Logo} width="100px" alt="slack_logo" />
            </Typography>
          </Box>
        ) : null}
        <Box sx={{ mr: "10px", mt: "5px" }}>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default DrawerComponent;
