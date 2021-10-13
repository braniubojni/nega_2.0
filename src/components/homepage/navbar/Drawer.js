import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../logo/logo.svg";
import SmallDropdown from "./SmallDropdown";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerToggling = () => {
    setOpenDrawer(false);
  };

  const menuItems = ["Product", "Enterprise", "Recources", "Pricing"];

  return (
    <>
      <Drawer open={openDrawer} anchor="left" onClose={handleDrawerToggling}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
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

        <List sx={{ minWidth: 500 }}>
          {menuItems.map((item, index) => {
            return index === 0 ? (
              <SmallDropdown key={item} />
            ) : (
              <ListItem key={item}>
                <ListItemIcon
                  sx={{
                    color: "rgba(0,0,0,1)",
                  }}
                >
                  <ListItemText>{item}</ListItemText>
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ ml: "20px", mt: "15px" }}>
          <Typography>
            <img src={Logo} width="100px" alt="slack_logo"></img>
          </Typography>
        </Box>
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
