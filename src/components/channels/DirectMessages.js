import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/system";
import EachUser from "../user/EachUser";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../../firebase";
import { Divider } from "@mui/material";

function SmallDropdown({ window }) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => setUsers(snapshot.docs));
    return () => {
      setUsers([]);
    };
  }, []);

  const renderUsers = (userData) => (
    <EachUser
      key={userData.id}
      id={userData.id}
      userName={userData?.data().email}
    />
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "light",
            primary: { main: "rgb(0,0,0)" },
            background: { paper: "rgb(255,255,255)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 500 }}>
          <Box
            sx={{
              bgcolor: open ? "rgba(255,255,255, 1)" : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItem
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Direct messages"
                primaryTypographyProps={{
                  fontSize: 17,
                  fontWeight: "bold",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
              <KeyboardArrowDown
                sx={{
                  ml: 0,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItem>
            <Divider sx={{ width: "200px" }} />
            {open &&
              users?.map((user) => (
                <List key={user.id} sx={{ mb: -4 }}>
                  {renderUsers(user)}
                </List>
              ))}
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default SmallDropdown;
