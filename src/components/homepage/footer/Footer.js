import React from "react";
import { v4 } from "uuid";
import InfoColumn from "./InfoColumn";
import { styled } from "@mui/system";

import { Container } from "@mui/material";

const FooterContainer = styled("footer")({
  position: "relative",
});
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
      "Partners",
      "Developers",
      "Apps",
      "Blog",
      "Help center",
      "Events",
    ],
  },
  {
    id: v4(),
    title: "Company",
    menuItem: [
      "About us",
      "Leadership",
      "Apps",
      "Blog",
      "Help center",
      "Events",
    ],
  },
];

function Footer() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 8,
      }}
    >
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
