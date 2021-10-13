import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const data = [
  { label: "Features" },
  { label: "Channels" },
  { label: "Integrations" },
  { label: "Security" },
  { label: "Slack Connect" },
  { label: "Solutions" },
  { label: "Customers" },
  { label: "Download Slack" },
];

function SmallDropdown() {
  const [open, setOpen] = React.useState(true);
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
            <ListItemButton
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
                primary="Product"
                primaryTypographyProps={{
                  fontSize: 17,
                  fontWeight: "bold",
                  lineHeight: "20px",
                  mb: "2px",
                }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {open &&
              data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 0, minHeight: 32, color: "rgba(0,0,0,.8)" }}
                >
                  <ListItemText
                    sx={{ minWidth: 1000 }}
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default SmallDropdown;
