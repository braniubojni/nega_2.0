import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Drawer, ListItem } from "@mui/material";
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
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AddNewChannel from "../chat/AddChannel";
import DirectMessages from "./DirectMessages";
import Chat from "../chat/Chat";
import { selectLoggedInUser } from "../../redux/common/auth/selectors";
import { useHistory } from "react-router";
import { SIGN_IN_ROUTE } from "../../constants/paths";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import db from "../../firebase";
import useWindowResize from "../helpers/customHooks/useWindowResize";
import { MAGENTA } from "../../constants/colors";
import SearchDrawer from "../searchDrawer/SearchDrawer";

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
  [theme.breakpoints.down(800)]: {
    width: "40vw",
  },
  [theme.breakpoints.down(600)]: {
    width: "40vw",
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
  width: "40vw",
  borderRadius: "10px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Channels({ window }) {
  const widthwindow = useWindowResize();
  const loggedUser = useSelector(selectLoggedInUser);
  const history = useHistory();
  const [channels, setChannels] = useState([]);
  const [inputValue, setInputValue] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const inputRef = useRef(null);
  const channelName = useSelector(selectChannelName);

  useEffect(() => {
    if (!loggedUser) {
      history.push(SIGN_IN_ROUTE);
    } else {
      const q = query(collection(db, "channels"), orderBy("timestamp"));
      const unsub = onSnapshot(q, (snapshot) => setChannels(snapshot?.docs));
      return unsub;
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
        closeBurger={setMobileOpen}
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
            <Paper elevation={0} sx={{ maxWidth: 500, overflowX: "hidden" }}>
              <Box
                sx={{
                  bgcolor: open ? "rgba(255,255,255, 1)" : null,
                  pb: open ? 2 : 0,
                  position: "relative",
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
                    primary="Channels"
                    primaryTypographyProps={{
                      fontSize: 17,
                      fontWeight: "bold",
                      lineHeight: "20px",
                      mb: "3px",
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
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 1,
                    mr: 10,
                  }}
                >
                  <AddNewChannel />
                </Box>
                <Divider sx={{ width: "300px", marginBottom: "2%" }} />
                {open &&
                  channels?.map((channel) => (
                    <Box key={channel.id}>{renderChannels(channel)}</Box>
                  ))}
              </Box>
            </Paper>
          </ThemeProvider>
        </Box>
      </List>
      <Box sx={{ overflowX: "hidden" }}>
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
              background: MAGENTA,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                ml: widthwindow > 960 ? 23 : 0,
                alignItems: "center",
              }}
            >
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
                    inputRef={inputRef}
                    onChange={(e) =>
                      setInputValue(e.target.value) && inputRef.focus()
                    }
                  />
                </Search>
              </Box>
              <Box>
                <SearchDrawer searchInput={inputValue} />
              </Box>
              <Box sx={{ ml: 3, display: "flex", alignItems: "center" }}>
                <HelpIcon />
              </Box>
            </Box>

            <Box sx={{ backgroundColor: MAGENTA, mr: -3 }}>
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
              pl: "12.5px",
              pt: "20px",
              pb: "5px",
            }}
          >
            <Box sx={{ mr: 0.5 }}>
              <FontAwesomeIcon
                icon={faHashtag}
                className="faHashtag"
              ></FontAwesomeIcon>
            </Box>
            <Box>
              <Typography>{channelName}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Chat />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Channels;
