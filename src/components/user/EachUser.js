import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { setChannelInfo } from "../../redux/common/channel/actions";

function EachUser({ id, userName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const setUser = () => {
    dispatch(setChannelInfo({ userId: id, userName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };

  return (
    <ListItemButton
      onClick={setUser}
      sx={{ "&:hover": { backgroundColor: "unset" } }}
    >
      <Box sx={{ fontSize: 12, mr: 1 }}>
        <FontAwesomeIcon icon={faHashtag} className="faHashtag" />
      </Box>
      <ListItemText sx={{ cursor: "pointer" }} primary={userName} />
    </ListItemButton>
  );
}

export default EachUser;
