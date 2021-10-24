import * as React from "react";
import { Link } from "react-router-dom";
import {
  CHANNELS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./../constants/paths";
import { Box, styled } from "@mui/system";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { selectLoggedInUser } from "../redux/common/auth/selectors";
import { LIGHT_ORANGE } from "../constants/colors";
import { MAGENTA } from "../constants/colors";
import useWindowResize from "../components/helpers/customHooks/useWindowResize";

function Buttons() {
  const history = useHistory();
  const widthWindow = useWindowResize();
  const loggedUser = useSelector(selectLoggedInUser);
  const StyledBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: widthWindow > 900 ? "flex-end" : "center",
    mr: 4,
  }));

  return (
    <StyledBox>
      {!loggedUser && (
        <Button
          variant="outlined"
          sx={{
            borderColor: "#611f69",
            fontWeight: "bolder",

            mr: "20px",
          }}
        >
          <Link
            style={{ textDecoration: "none", whiteSpace: "nowrap" }}
            to={SIGN_UP_ROUTE}
          >
            SIGN UP
          </Link>
        </Button>
      )}
      <Button
        variant="outlined"
        style={{
          backgroundColor: MAGENTA,
          width: "130px",
          padding: "7px",
          marginRight: "16px",
        }}
      >
        <div
          style={{
            color: LIGHT_ORANGE,
            textDecoration: "none",
          }}
          sx={{ fontWeight: "bold" }}
          onClick={() =>
            loggedUser
              ? history.push(CHANNELS_ROUTE)
              : history.push(SIGN_IN_ROUTE)
          }
        >
          {!loggedUser ? "Try for free" : "Open Chanels"}
        </div>
      </Button>
    </StyledBox>
  );
}

export default Buttons;
