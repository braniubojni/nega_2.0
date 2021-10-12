import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { selectChannelName } from "../../redux/common/channel/selectors";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpIcon from "@mui/icons-material/Help";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Channel from "../channels/Channel";
import { useSelector } from "react-redux";
import ProfileDropdown from "../homepage/navbar/ProfileDropdown";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AddNewChannel from "../dialogs/AddChannel";
import DirectMessages from "./DirectMessages";
import Chat from "../chat/Chat";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { useHistory } from "react-router";
import { SIGN_IN_ROUTE } from "../../constants/paths";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../../firebase";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "550px",

  borderRadius: "10px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Channels({ window }) {
  const loggedUser = useSelector(selectLoggedInUser);
  const history = useHistory();
  const [channels, setChannels] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const channelName = useSelector(selectChannelName);

  useEffect(() => {
    if (!loggedUser) {
      history.push(SIGN_IN_ROUTE);
    } else {
      onSnapshot(collection(db, "channels"), (snapshot) =>
        setChannels(snapshot?.docs)
      );
    }
  }, [history, loggedUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const renderChannels = (channel) => {
    return (
      <Channel
        key={channel.id}
        id={channel.id}
        channelName={channel?.data().channelName}
      />
    );
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
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
                  position: "relative",
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 1.1,
                    pb: open ? 0 : 2.5,
                    "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Channels"
                    primaryTypographyProps={{
                      fontSize: 15,
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
                </ListItemButton>
                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                  <AddNewChannel />
                </Box>
                <Divider sx={{ width: "200px" }} />
                {open &&
                  channels?.map((channel) => (
                    <List sx={{ mb: -4 }} key={channel.id}>
                      {renderChannels(channel)}
                    </List>
                  ))}
              </Box>
            </Paper>
          </ThemeProvider>
        </Box>
      </List>
      <Box>
        <DirectMessages />
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#611f69",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "flex-end", ml: 23 }}>
              <AccessTimeIcon />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ ml: 2 }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
              <Box sx={{ ml: 5 }}>
                <HelpIcon />
              </Box>
            </Box>
            <Box sx={{ backgroundColor: "black" }}>
              <ProfileDropdown />
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: "12.5px",
            }}
          >
            <Box sx={{ mr: 0.5 }}>
              <FontAwesomeIcon
                icon={faHashtag}
                className="faHashtag"
              ></FontAwesomeIcon>
            </Box>
            <Box sx={{ mr: 0.5 }}>
              <Typography>{channelName}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Chat />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Channels;
