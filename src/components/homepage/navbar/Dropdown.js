import * as React from "react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";

function Dropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownItems = [
    "Features",
    "Channels",
    "Integrations",
    "Security",
    "Slack Connect",
    "Solutions",
    "Customers",
    "Download Slack",
  ];

  return (
    <div>
      <Box
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        fontWeight="lighter"
      >
        Product
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dropdownItems.map((item) => {
          return (
            <MenuItem color="#1d1d1d" key={item} onClick={handleClose}>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default Dropdown;
