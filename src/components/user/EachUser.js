import { ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { USERS_ROUTE } from "../../constants/paths";
import { useGetRole } from "../helpers/customHooks/useGetRole";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveUser from "../chat/Remove";
import { handleUserRemove } from "../helpers/handlers";
import { setChannelInfo } from "../../redux/common/channel/actions";

function EachUser({ id, userName, closeBurger }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useGetRole();
  const [showRemove, setShowRemove] = useState(false);
  const [removeUser, setRemoveUser] = useState(null);

  const onRemoveClose = () => {
    setRemoveUser(null);
  };

  const setUser = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: userName }));
    closeBurger(false);
    history.push(`${USERS_ROUTE}/${id}`);
  };

  return (
    <ListItemButton
      sx={{ py: 0, minHeight: 32 }}
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
