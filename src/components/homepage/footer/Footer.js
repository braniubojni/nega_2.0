import React from "react";
import { v4 } from "uuid";
import InfoColumn from "./InfoColumn";
import { makeStyles } from "@mui/styles";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import { styled } from "@mui/system";

import { Container } from "@mui/material";

const useStyles = makeStyles(({ theme }) => ({
  footer: {
    position: "relative",
  },
  footer__wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const FooterContainer = styled("footer")(({ theme }) => ({
  position: "relative",
}));
const FooterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  [theme.breakpoints.down(700)]: {
    justifyContent: "start",
    flexDirection: "column",
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
  const widthWindow = useWindowResize();
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <FooterContainer>
        <FooterWrapper>
          {columns.map((props) => (
            <InfoColumn key={props.id} {...props} />
          ))}
        </FooterWrapper>
      </FooterContainer>
    </Container>
  );
}

export default Footer;
