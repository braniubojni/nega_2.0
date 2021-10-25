import * as React from "react";
import { Link } from "react-router-dom";
import {
  CHANNELS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../constants/paths";
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
  const width = useWindowResize();
  const loggedUser = useSelector(selectLoggedInUser);
  const StyledBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: width > 900 ? "flex-end" : "center",
    flexDirection: width > 500 ? "row" : "column",
    mt: 20,
    mr: 4,
  }));

  return (
    <StyledBox>
      {!loggedUser && (
        <Button
          fullWidth
          variant="outlined"
          size={width > 900 ? "medium" : "large"}
          sx={{
            borderColor: "#611f69",
            fontWeight: "bolder",
            width: width > 900 ? "130px" : width < 500 ? "100%" : "49%",
            mr: "20px",
            mb: width > 500 ? "0" : "20px",
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
        sx={{
          backgroundColor: MAGENTA,
          width: width > 900 ? "130px" : width < 500 ? "100%" : "49%",
          padding: "7px",
          marginRight: "16px",
          "&:hover": {
            backgroundColor: MAGENTA,
          },
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
