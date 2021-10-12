import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, List } from "@mui/material";
import { Box } from "@mui/system";

const slideData = [
  {
    numberIcon: "1",
    h1: "Sign up",
    h2: "Create a new Slack workspace in just a few moments. It's free to try for teams of any size.",
  },
  {
    numberIcon: "2",
    h1: "Invite your coworkers",
    h2: "Slack is better together (no, really, it's a bit underwhelming by yourself), and it's easy to invite your team.",
  },
  {
    numberIcon: "3",
    h1: "Try it out",
    h2: "Run a project, coordinate with your team, or just talk it out. Slack is a blank canvas for teamwork.",
  },
];

function useWindowResize() {
  const [windowResize, setWindowResize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowResize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowResize]);
  return windowResize;
}

function Slide2(incomeData = slideData) {
  const renderSlides = (card) => {
    return (
      <Box
        sx={{
          width: 300,
          height: 270,
          borderRadius: 0,
          background: "#FFF5EE",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mr: "50px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "5px",
              mb: "25px",
              mt: "20px",
              background: "#611f69",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {card.numberIcon}
          </Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            fontSize="17px"
            marginBottom="25px"
          >
            {card.h1}
          </Typography>
          <Typography width="260px" variant="body2" color="text.secondary">
            {card.h2}
          </Typography>
        </CardContent>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          background: "#FFF5EE",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize="30px"
          textAlign="center"
          marginTop="40px"
        >
          Get started with Slack
        </Typography>
        <List sx={{ display: "flex" }}>
          {slideData.map((slideItem) => renderSlides(slideItem))}
        </List>
      </Box>
    </>
  );
}

export default Slide2;
