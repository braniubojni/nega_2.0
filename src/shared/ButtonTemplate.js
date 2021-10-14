import * as React from "react";
import { Link } from "react-router-dom";
import {
  CHANNELS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./../constants/paths";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { selectLoggedInUser } from "../redux/common/auth/selectors";

function Buttons() {
  const history = useHistory();
  const loggedUser = useSelector(selectLoggedInUser);

  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      {!loggedUser && (
        <Button
          variant="outlined"
          sx={{
            borderColor: "#611f69",
            fontWeight: "bolder",
            mr: "20px",
          }}
        >
          <Link style={{ textDecoration: "none" }} to={SIGN_UP_ROUTE}>
            SIGN UP
          </Link>
        </Button>
      )}
      <Button
        sx={{
          color: "#f6efe8",
          backgroundColor: "#611f69",
          width: "130px",
          fontWeight: "bold",
          padding: "7px",
          "&:hover": {
            backgroundColor: "inherit",
          },
        }}
        onClick={() =>
          loggedUser
            ? history.push(CHANNELS_ROUTE)
            : history.push(SIGN_IN_ROUTE)
        }
      >
        {!loggedUser ? "Try for free" : "Open Chanels"}
      </Button>
    </Box>
  );
}

export default Buttons;
