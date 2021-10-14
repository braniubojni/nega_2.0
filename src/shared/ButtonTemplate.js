import * as React from "react";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./../constants/paths";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

function Buttons() {
  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      <Button
        variant="outlined"
        sx={{
          borderColor: "#611f69",
          fontWeight: "bolder",
          mr: "20px",
        }}
      >
        <Link style={{ textDecoration: "none" }} to={SIGN_UP_ROUTE}>
          Sign Up
        </Link>
      </Button>
      <Button
        style={{
          backgroundColor: "#611f69",
          width: "130px",
          padding: "7px",
        }}
      >
        <Link
          style={{
            color: "#f6efe8",
            textDecoration: "none",
          }}
          sx={{ fontWeight: "bold" }}
          to={SIGN_IN_ROUTE}
        >
          Try for free
        </Link>
      </Button>
    </Box>
  );
}

export default Buttons;
