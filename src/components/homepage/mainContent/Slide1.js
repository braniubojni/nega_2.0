import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, List, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "infinite-react-carousel";

import img1 from "./Images/image_1.jpg";
import img2 from "./Images/image_2.jpg";
import img3 from "./Images/image_3.jpg";
import img4 from "./Images/image_4.jpg";
import { Box } from "@mui/system";
import useWindowResize from "../../helpers/customHooks/useWindowResize";

const BoxItems = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down(1112)]: {
    "&:nth-of-type(even)": {
      marginRight: 10,
    },
  },
}));

const slideData = [
  { h1: "Webinar", h2: "What is Slack?", img: img1 },
  {
    h1: "Customer Stories",
    h2: "Get inspired by real Slack customers",
    img: img2,
  },
  {
    h1: "Solutions",
    h2: "Learn how Slack can work for your team",
    img: img3,
  },
  {
    h1: "How-to",
    h2: "Start off on the right foot with Slack 101",
    img: img4,
  },
];

function Slide1(incomeData = slideData) {
  const widthWindow = useWindowResize();
  const renderSlides = (card) => {
    return (
      <Card
        sx={{
          width: 220,
          height: 330,
          p: "10px",
          borderRadius: 0,
          m: "10px",
          "&:hover": { transform: "scale(1.1)", transition: "all 0.4s" },
        }}
      >
        <CardMedia
          component="img"
          alt="card_image"
          height="140"
          image={card.img}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {card.h1}
          </Typography>
          <Typography
            variant="h5"
            color="black"
            fontWeight="bold"
            fontSize="20px"
            marginTop="10px"
          >
            {card.h2}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
        }}
      >
        {widthWindow > 628 ? (
          <BoxItems>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              {slideData.map((slideItem) => (
                <Grid key={slideItem.h1} item lg={3} md={6}>
                  <List
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {renderSlides(slideItem)}
                  </List>
                </Grid>
              ))}
            </Grid>
          </BoxItems>
        ) : (
          <Box>
            <Slider dots>
              {slideData.map((slideItem) => (
                <Box
                  key={slideItem.h1}
                  sx={{ display: "flex !important", justifyContent: "center" }}
                >
                  {renderSlides(slideItem)}
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Slide1;
