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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Channel from "../channels/Channel";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import AddNewChannel from "../dialogs/AddChannel";

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

function DirectMessages({ window, channels, Chat }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const channelName = useSelector(selectChannelName);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Paper elevation={0} sx={{ maxWidth: 500 }}>
      <Box
        sx={{
          bgcolor: open ? "rgba(255,255,255, 1)" : null,
          pb: open ? 2 : 0,
          display: "flex",
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 0,
            pb: open ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Direct messages"
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
          <Box>
            <AddNewChannel />
          </Box>
        </ListItemButton>
        <Divider />

        {/* {open &&
          channels?.map((channel) => (
            <ListItemButton sx={{ mb: -4 }}>
              {renderChannels(channel)}
            </ListItemButton>
          ))} */}
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Box>
    </Paper>
  );
}

export default DirectMessages;
