import { makeStyles } from "@mui/styles";
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
  return (
    <ul className={classes.list_wrapper}>
      <li className={classes.heading}>{title}</li>
      {menuItem.map((item) => (
        <li key={item} className={classes.menuItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default InfoColumn;
