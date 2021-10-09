import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import Channel from "../channels/Channel";
import { useSelector } from "react-redux";
import LogOutDialog from "../dialogs/LogOutDialog";

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
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function ChannelArea({ window, channels, Chat }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const channelName = useSelector(selectChannelName);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 0.5,
            pb: 1.5,
          }}
        >
          <Box sx={{ mr: 1 }}>
            <Typography>Channel Name</Typography>
          </Box>
          <Box>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="faAngleDown"
            ></FontAwesomeIcon>
          </Box>
        </Box>
        <Divider />
        {channels?.map((channel) => renderChannels(channel))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
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
            <Box>
              <AccountCircleIcon
                sx={{ marginRight: "10px", marginLeft: "10px" }}
              />
              <LogOutDialog />
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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

export default ChannelArea;
