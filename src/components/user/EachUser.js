import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE } from "../../constants/paths";
import { setChannelInfo } from "../../redux/common/channel/actions";
import { useGetRole } from "../helpers/customHooks/useGetRole";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveUser from "../chat/Remove";
import { handleUserRemove } from "../helpers/handlers";

function EachUser({ id, userName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useGetRole();
  const [showRemove, setShowRemove] = useState(false);
  const [removeUser, setRemoveUser] = useState(null);

  const onRemoveClose = () => {
    setRemoveUser(null);
  };

  const setUser = () => {
    dispatch(setChannelInfo({ userId: id, userName }));
    history.push(`${CHANNELS_ROUTE}/${id}`);
  };

  return (
    <ListItemButton
      sx={{ py: 0, minHeight: 32 }}
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon sx={{ color: "inherit", minWidth: 23 }}>
          <FontAwesomeIcon icon={faHashtag} className="faHashtag" />
        </ListItemIcon>
        <ListItemText
          onClick={setUser}
          primary={userName}
          primaryTypographyProps={{
            fontSize: "1rem",
            fontWeight: "medium",
          }}
        />
        {showRemove && role && (
          <RemoveIcon cursor="pointer" onClick={() => setRemoveUser(true)} />
        )}
      </Box>
      {removeUser && (
        <RemoveUser
          onRemoveClose={onRemoveClose}
          name={userName}
          id={id}
          removeFunc={handleUserRemove}
        />
      )}
    </ListItemButton>
  );
}

export default EachUser;
