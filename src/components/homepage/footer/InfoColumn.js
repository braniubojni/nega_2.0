import { useState } from "react";
import { makeStyles } from "@mui/styles";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { BLACK } from "../../../constants/colors";
import { GRAY } from "../../../constants/colors";
// menu item instead of regular
const useStyles = makeStyles(() => ({
  list_wrapper: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    listStyle: "none",
    fontSize: 15,
    padding: 0,
  },
  heading: {
    fontWeight: 700,
    height: 40,
    color: BLACK,
    textTransform: "uppercase",
    padding: "0 15px",
  },
  menuItem: {
    height: 40,
    color: GRAY,
    padding: "0 15px",
    textTransform: "capitalize",
  },
}));

function InfoColumn({ title, menuItem }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const widthWindow = useWindowResize();
  return (
    <>
      {widthWindow > 700 ? (
        <ul className={classes.list_wrapper}>
          <li className={classes.heading}>{title}</li>
          {menuItem.map((item) => (
            <li key={item} className={classes.menuItem}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <Box sx={{ display: "flex", ml: -1, mt: "25px" }}>
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
            <Paper elevation={0} sx={{ maxWidth: "100%" }}>
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
                    pb: open ? 0 : 1.5,
                    "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                      fontSize: 17,
                      lineHeight: "20px",
                      textTransform: "capitalize",
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
                  menuItem.map((item) => (
                    <ListItemButton
                      key={item}
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "rgba(0,0,0,.8)",
                        ml: 4,
                      }}
                    >
                      <ListItemText
                        sx={{ minWidth: 1000 }}
                        primary={item}
                        onClick={() => setOpen(false)}
                        primaryTypographyProps={{
                          fontSize: 18,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  ))}
              </Box>
            </Paper>
          </ThemeProvider>
        </Box>
      )}
    </>
  );
}

export default InfoColumn;
