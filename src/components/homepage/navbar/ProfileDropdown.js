import * as React from "react";
import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "@firebase/auth";
import LogOutDialog from "../../chat/LogOutDialog";
import { Box } from "@mui/system";

function ProfileDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userEmail = getAuth();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box fontSize="25px">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="faUserCircle"
            color="#FFFFFF"
          ></FontAwesomeIcon>
        </Box>
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
        <MenuItem>{userEmail.currentUser?.email}</MenuItem>
        <MenuItem>
          <LogOutDialog />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileDropdown;
