import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { getAuth } from "@firebase/auth";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/system";
import EachUser from "../user/EachUser";
import { collection, onSnapshot } from "@firebase/firestore";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { useSelector } from "react-redux";
import db from "../../firebase";
import { Divider } from "@mui/material";

function DirectMessages({ closeBurger }) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);
  const auth = getAuth();
  const loggedUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => setUsers(snapshot.docs));
    return () => {
      setUsers([]);
    };
  }, []);

  const renderUsers = (userData) => {
    return userData?.data()?.email === auth?.currentUser?.email ? null : (
      <EachUser
        key={userData?.id}
        id={userData?.data()?.id}
        currentId={loggedUser?.id}
        userName={userData?.data().email}
        removeId={userData?.id}
        closeBurger={closeBurger}
      />
    );
  };

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
                px: 2.5,
                pt: 2.5,
                pb: open ? 0 : 1.5,
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
                  mt: 0.4,
                  mr: 12.5,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItem>
            <Divider sx={{ width: "300px", marginBottom: "2%" }} />
            {open &&
              users?.map((user) => (
                <Box key={user?.id}>{renderUsers(user)}</Box>
              ))}
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default DirectMessages;
