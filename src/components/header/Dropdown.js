import * as React from "react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem, Button, Divider } from "@mui/material";

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
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Product
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dropdownItems.map((item, index) => {
          return index === dropdownItems.length - 1 ? (
            <>
              <Divider />
              <MenuItem onClick={handleClose} key={item}>
                {item}
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleClose} key={item}>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default Dropdown;
