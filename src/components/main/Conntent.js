import React, { useState } from "react";
import { Box, fontSize, styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import YouTubeVideo from "./YouTube";
import DialogVideo from "./VideoDialogs";
import useWindowResize from "../helpers/customHooks/useWindowResize";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

const Content = styled("div")(({ theme }) => ({
  marginTop: 50,
  display: "flex",
  justifyContent: "space-between",
  //   alignItems: "center",
  paddingLeft: 15,
  paddingRight: 15,
  flexDirection: "row",
  marginTop: 40,
  [theme.breakpoints.down("1000")]: {
    justifyContent: "center",
  },
}));
const H2 = styled("h2")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 900,
}));
const Text = styled("span")(({ theme }) => ({
  lineHeight: 1.44444444,
  letterSpacing: -0.2,
  fontSize: "1.125rem",
}));
const ContentItemWraper = styled("div")(({ theme }) => ({}));
const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}));
const ContentImgConTainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down(600)]: {},
  [theme.breakpoints.down(400)]: {
    marginTop: 15,
    flexWrap: "wrap",
  },
}));
const Video = styled("video")({
  minWidth: 200,
  width: "125%",
});
const Img = styled("img")(({ theme }) => ({
  borderRadius: 10,
  cursor: "pointer",
  [theme.breakpoints.down("600")]: {
    width: 190,
  },
}));

function Contents({ content, index }) {
  const windowWidth = useWindowResize();

  // playVideo
  // ContentItem componenti anuny
  // <ul><li>tag</li></ul>
  // bolor qo componentneri warningnery
  // flex reverse
  // avelacnel useWindowResize ekrani chapsy voroshelu hamar
  console.log(windowWidth);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Container maxWidth="lg">
        <Content
          style={{
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
            }}
          >
            <H2>{content.title}</H2>
            <Typography variant="subtitle1" component="div">
              {content.text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {content.img.map((item, index) => (
                <div>
                  <Img src={item} onClick={handleOpen} />
                  {open && (
                    <DialogVideo
                      open={open}
                      video={content.videoLink[index]}
                      handleClose={handleClose}
                    />
                  )}
                </div>
              ))}
            </Box>
          </Box>
          <ContentImgConTainer
            style={
              index % 2 === 0
                ? {
                    paddingLeft: 15,
                  }
                : { paddingRight: 15 }
            }
          >
            {windowWidth > 1000 ? (
              <Video autoPlay loop muted>
                <source src={content.video} />
              </Video>
            ) : null}
          </ContentImgConTainer>
        </Content>
      </Container>
    </>
  );
}

export default Contents;
