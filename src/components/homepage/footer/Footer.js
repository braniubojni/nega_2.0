import React from "react";
import { v4 } from "uuid";
import InfoColumn from "./InfoColumn";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  footer: {
    position: "relative",
  },
  footer__wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const columns = [
  {
    id: v4(),
    title: "Why Slack?",
    menuItem: [
      "Slack vs Email",
      "Channels",
      "Engagement",
      "Scale",
      "Watch the Demo",
    ],
  },
  {
    id: v4(),
    title: "Product",
    menuItem: ["Features", "integrations", "enterprise", "solutions"],
  },
  {
    id: v4(),
    title: "Pricing",
    menuItem: ["plans", "paid vs free"],
  },
  {
    id: v4(),
    title: "RESOURCES",
    menuItem: [
      "partners",
      "developers",
      "apps",
      "blog",
      "help center",
      "events",
    ],
  },
  {
    id: v4(),
    title: "company",
    menuItem: [
      "about us",
      "leadership",
      "apps",
      "blog",
      "help center",
      "events",
    ],
  },
];

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__wrapper}>
        {columns.map((props) => (
          <InfoColumn key={props.id} {...props} />
        ))}
      </div>
    </footer>
  );
}

export default Footer;
