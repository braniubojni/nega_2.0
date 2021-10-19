import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const H3 = styled(Typography)(({ theme }) => ({
  color: "#1d1d1d",
  lineHeight: "1.12",
  fontWeight: 700,
  textAlign: "center",
  marginTop: 30,
}));
const Line = styled("div")(({ theme }) => ({
  width: "100",
  height: "5px",
  backgroundColor: "#4a154b",
  marginTop: 30,
  marginBottom: 30,
}));

const pricingContenet = [
  {
    title: "Free",
    text: "The quickest and easiest way to try Slack",
    price: "0",
    advantage: [
      "Access to 10,000 of your team’s most recent messages",
      "10 integrations with other apps like Google Drive, Office 365 and many more",
      "1:1 voice and video calls between teammates",
    ],
  },
  {
    title: "Pro",
    text: "Scale your business, increase productivity, and keep your teams connected",
    price: "12.50",
    advantage: [
      "Advanced identity management through SAML-based SSO and real-time Active Directory sync with OneLogin, Okta and Ping Identity",
      "Compliance requirements met with data exports for all messages",
      "Around-the-clock teamwork and assistance with 99.99% guaranteed uptime and 24/7 support with a four-hour response time",
    ],
  },
  {
    title: "Business+",
    text: "More power for small teams who want better collaboration",
    price: "6.67",
    advantage: [
      "The full context of your organization’s message history at your fingertips",
      "Timely info and actions in one place with unlimited integrations",
      "Face-to-face communication with group voice and video calls of up to 15 teammates",
      "Secure collaboration with outside organizations or guests from within Slack",
    ],
  },
];

function Pricing() {
  function renderAdvantage(item) {
    return (
      <>
        <div>
          <CheckIcon />
          {item}
        </div>
      </>
    );
  }
  function renderPricingContent(item) {
    return (
      <>
        <Typography variant="h4" component="h4">
          {item.title}
        </Typography>
        <Typography variant="body2">{item.text}</Typography>
        <Typography variant="h3" component="h3">
          <AttachMoneyIcon />
          {item.price}
          <span>/on</span>
        </Typography>
        <div>
          {item.advantage.map((item) => (
            <div key={item}>{renderAdvantage(item)}</div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <Container maxWidth="lg">
        <H3 variant="h3" component="h3">
          Make teamwork more productive
        </H3>
        <Line></Line>
        <Box>
          <Card>
            {pricingContenet.map((item) => (
              <CardContent key={item.price}>
                {renderPricingContent(item)}
              </CardContent>
            ))}
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default Pricing;
