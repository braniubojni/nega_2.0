import React from "react";
import EDUChannelsHero from "./photo/EDU-Channels-hero@2x.jpg";
import EDUNotificationsHero from "./photo/EDU-Notifications-hero@2x-1.jpg";
import EDURemindersHero from "./photo/EDU-Reminders-Hero@2x.jpg";
import EDUThreadsHero from "./photo/EDU-Threads-hero@2x.jpg";
import PlatformEducation from "./photo/img-hero-platform-education@2x.jpg";
import slackConnectHeader from "./photo/slack-connect-header-article@2x.jpg";
import workstyleInnovationDay from "./photo/slack-workstyle-innovation-day-hero.ja-JP@2x-1.jpg";
import platformUser from "./photo/platform-user-EDU-ebook-promo-hero-670x500@2x.jpg";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

const Line = styled("div")(({ theme }) => ({
  width: "100%",
  height: 2,
  backgroundColor: "#565353",
}));

const Img = styled("img")(({ theme }) => ({
  width: "100%",
  marginBottom: 16,
  [theme.breakpoints.down(1187)]: {
    width: "42vh",
  },
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  lineHeight: "1.25",
  letterSpacing: "0",
  fontSize: "1.5rem",
  marginBottom: 16,
}));

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  lineHeight: "1.44444444",
  letterSpacing: "normal",
  fontSize: "1.125rem",
}));
const BoxContainer = styled(Box)(({ theme }) => ({
  height: 500,
}));
const BoxTextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
}));
const recorcesContent = [
  {
    img: EDURemindersHero,
    title: "How to use reminders in Slack",
    text: "How to create automated answers for frequently asked workplace questions, gently nudge coworkers, and more",
  },
  {
    img: EDUNotificationsHero,
    title: "Customize your notifications in Slack",
    text: "Create alerts for custom keywords, carve out focus time with Do Not Disturb, and more",
  },
  {
    img: EDUChannelsHero,
    title: "How to organize your Slack channels",
    text: "Best practices for setting up your workspace’s channels",
  },
  {
    text: "Tips for organizing your conversations and keeping channels focused",
    title: "Tips on how best to use threaded messages",
    img: EDUThreadsHero,
  },
  {
    img: slackConnectHeader,
    title: "Tips for working with people outside your company in Slack Connect",
    text: "So you received an invite to join a Slack Connect channel. Welcome! Here’s what to do next:",
  },
  {
    img: platformUser,
    title: "16 tips to work smarter with Slack apps and workflows",
    text: "Learn how to streamline your work day with time-saving tools",
  },
  {
    img: PlatformEducation,
    title: "Get more done with Slack apps and workflows",

    text: "Learn about how to maximize your time, streamline collaboration, and boost team connection in Slack",
  },
  {
    img: workstyleInnovationDay,
    title:
      "How to transform your organization to an event-driven and composable enterprise",
    text: "Watch this session as leaders discuss the “composable enterprise” and the value it can provide your organization",
  },
];

function Resources() {
  console.log("From resources");
  function renderContent(item) {
    return (
      <>
        <BoxContainer
          sx={{
            width: "100%",
            mb: 3,
          }}
        >
          <Box>
            <Img src={item.img} />
          </Box>
          <BoxTextContent>
            <Title variant="h3" component="h3">
              {item.title}
            </Title>
            <Text variant="body2">{item.text}</Text>
          </BoxTextContent>
        </BoxContainer>
        <Line />
      </>
    );
  }
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={3}>
          {recorcesContent.map((item) => (
            <Grid key={item.title} item lg={3} md={6} xs={12} sx={{ mb: 3 }}>
              <Box>{renderContent(item)}</Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Resources;
