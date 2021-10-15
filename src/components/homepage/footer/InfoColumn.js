import { makeStyles } from "@mui/styles";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import Slider from "infinite-react-carousel";

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
    color: "#1d1d1d",
    textTransform: "uppercase",
    padding: "0 15px",
  },
  menuItem: {
    height: 40,
    color: "#454545",
    padding: "0 15px",
    textTransform: "capitalize",
  },
}));

function InfoColumn({ title, menuItem }) {
  const classes = useStyles();
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
      ) : null}
    </>
  );
}

export default InfoColumn;
