import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import useWindowResize from "../../helpers/customHooks/useWindowResize";
import { BLACK } from "../../../constants/colors";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const Content = styled("div")(({ theme }) => ({
  marginTop: 60,
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: 15,
  paddingRight: 15,
  flexDirection: "row",
  color: BLACK,
  [theme.breakpoints.down("1045")]: {
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

const Video = styled("video")({
  width: 430,
});
const Img = styled("img")(({ theme }) => ({
  borderRadius: 10,
  cursor: "pointer",

  [theme.breakpoints.down("600")]: {
    width: 190,
  },
}));
const ImgPosition = styled("div")({
  position: "relative",
  opacity: 1,
  "&:hover": {
    opacity: 0.8,
  },
});
const IconPosition = styled("div")({
  position: "absolute",
  top: "62%",
  left: "74%",
  color: "rgba(255, 255, 255, 0.5)",

  cursor: "pointer",
  "&:hover": {
    color: "rgba(234, 226, 226, 0.2)",
    transition: "all 0.8",
  },
  opacity: 1,
});

function ContentItem({ content, index }) {
  const windowWidth = useWindowResize();
  const [isOpen, setOpen] = useState(false);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (link !== null) {
      setOpen(true);
    }
    return () => setOpen(false);
  }, [link]);

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
                marginBottom: 1.87,
              }}
            >
              {content.text}
            </Typography>
            <ContentImgItem>
              {content.img.map((item, newIndex) => (
                <ImgPosition key={item + newIndex}>
                  <IconPosition
                    className="icon"
                    onClick={() => setLink(item.link)}
                  >
                    <PlayCircleOutlineIcon fontSize="large" />
                  </IconPosition>
                  <Img src={item.name} onClick={() => setLink(item.link)} />
                </ImgPosition>
              ))}
              <React.Fragment>
                <ModalVideo
                  channel="youtube"
                  autoplay={true}
                  isOpen={isOpen}
                  videoId={link}
                  onClose={() => setLink(null) || setOpen(false)}
                />
              </React.Fragment>
            </ContentImgItem>
          </ContentItemWraper>
          <div
            style={
              index % 2 === 0
                ? {
                    paddingLeft: 15,
                  }
                : { paddingRight: 15 }
            }
          >
            {windowWidth > 1044 ? (
              <Video autoPlay loop muted>
                <source src={content.video} />
              </Video>
            ) : null}
          </div>
        </Content>
      </Container>
    </>
  );
}

export default ContentItem;
