import * as React from "react";
import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./../constants/paths";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { LIGHT_ORANGE } from "../constants/colors";
import { MAGENTA } from "../constants/colors";

function Buttons() {
  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      <Button
        variant="outlined"
        sx={{
          borderColor: MAGENTA,
          fontWeight: "bolder",
          mr: "20px",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: MAGENTA }}
          to={SIGN_UP_ROUTE}
        >
          Sign Up
        </Link>
      </Button>
      <Button
        style={{
          backgroundColor: MAGENTA,
          width: "130px",
          padding: "7px",
        }}
      >
        <Link
          style={{
            color: LIGHT_ORANGE,
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
