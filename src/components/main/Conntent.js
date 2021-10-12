import React, { useState } from "react";
import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import DialogVideo from "./VideoDialogs";
import useWindowResize from "../helpers/customHooks/useWindowResize";

const Content = styled("div")(({ theme }) => ({
  marginTop: 60,
  display: "flex",
  justifyContent: "space-between",
  //   alignItems: "center",
  paddingLeft: 15,
  paddingRight: 15,
  flexDirection: "row",
  color: "#1d1d1d",
  [theme.breakpoints.down("1000")]: {
    marginTop: 40,
    justifyContent: "center",
  },
}));
const H2 = styled("h2")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 900,
}));

const ContentItemWraper = styled("div")(({ theme }) => ({
  width: 500,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  flexWrap: "wrap",
}));
const ContentImgItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("501")]: {
    flexWrap: "wrap",
    marginTop: 15,
  },
}));

const ContentImgConTainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down(600)]: {},
}));
const Video = styled("video")({
  minWidth: 400,
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
          <ContentItemWraper>
            <H2>{content.title}</H2>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                lineHeight: 1.44444444,
                letterSpacing: -0.2,
                fontSize: "1.125rem",
              }}
            >
              {content.text}
            </Typography>
            <ContentImgItem>
              {content.img.map((item, index) => (
                <div key={content.imgName[index]}>
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
            </ContentImgItem>
          </ContentItemWraper>
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
