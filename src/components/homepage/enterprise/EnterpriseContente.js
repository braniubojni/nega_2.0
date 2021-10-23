import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import useWindowResize from "../../helpers/customHooks/useWindowResize";

const Video = styled("video")({
  width: "99vh",
});
const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  marginRight: 20,
  width: "50%",
  [theme.breakpoints.down(964)]: {
    justifyContent: "center",
    width: "100%",
  },
}));
const H5 = styled(Typography)(({ theme }) => ({
  fontSize: ".875rem",
  fontWeight: "700",
  lineHeight: "1.125",
  letterSpacing: ".8px",
}));
const H3 = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  lineHeight: "1.1875",
  letterSpacing: "-0.3px",
  fontSize: "1.5rem",
}));
const ListBox = styled(List)(({ theme }) => ({
  padding: 0,
}));
const ListContent = styled(ListItem)(({ theme }) => ({
  padding: 0,
  display: "flex",
  alignItems: "center",
}));
const ChekedBox = styled(Box)({
  borderRadius: "50%",
  marginRight: 16,
});
const ChehkBoxText = styled(Typography)({
  fontWeight: "400",
  lineHeight: "1.44444444",
  letterSpacing: "normal",
  fontSize: "1.125rem",
});
const Text = styled(Typography)({
  fontWeight: "300",
  lineHeight: "1.35714286",
  letterSpacing: "-0.3px",
  fontSize: "1.25rem",
  fontStyle: "italic",
});
const Percent = styled(List)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const PercentContent = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  flexDirection: "column",
  width: 200,
});
const PercentTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  lineHeight: "1",
  letterSpacing: "normal",
  fontSize: "3rem",
  whiteSpace: "nowrap",
}));
const PercentText = styled(Typography)({
  fontSize: ".875rem",
  fontWeight: "700",
  lineHeight: "1.125",
  letterSpacing: ".8px",
});

function EnterpriseContente(props) {
  const widthWindow = useWindowResize();
  const { content, index } = props;
  return (
    <>
      <Box
        sx={{
          backgroundColor: index % 2 === 0 ? "#f2ede4" : "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <BoxContainer>
            <H5 variant="h5" component="h5">
              {content.title}
            </H5>
            <H3 variant="h3" component="h5">
              {content.boltText}
            </H3>
            <Box>
              <ListBox>
                {content.chekedText.map((item) => (
                  <ListContent key={item}>
                    <ChekedBox
                      sx={{
                        backgroundColor: content.chekedColor,
                        color: index % 2 === 0 ? "#f4efe8" : "#fff",
                      }}
                    >
                      <CheckIcon fontSize="small" />
                    </ChekedBox>
                    <ChehkBoxText variant="body2">{item}</ChehkBoxText>
                  </ListContent>
                ))}
              </ListBox>
            </Box>
            <Box>
              {content.text.length !== 0 ? (
                <Text variant="body1">{content.text}</Text>
              ) : content.paragrap.length !== 0 ? (
                <Box>
                  <Percent>
                    {content.paragrap.map((item) => (
                      <PercentContent key={item.percent}>
                        <PercentTitle
                          variant="h1"
                          component="h1"
                          sx={{
                            color: content.chekedColor,
                          }}
                        >
                          {item.percent}
                        </PercentTitle>
                        <PercentText variant="body2">{item.text}</PercentText>
                        <img src={item.img} />
                      </PercentContent>
                    ))}
                  </Percent>
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={1}>
                    {content.imgParagrap.map((item, index) => (
                      <Grid item sx={3} lg={3} sm={4} key={index + "a"}>
                        <img src={item} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
            <Box>
              <img src={content.img} />
            </Box>
          </BoxContainer>
          {widthWindow > 964 ? (
            <Video autoPlay loop muted>
              <source src={content.video} />
            </Video>
          ) : null}
        </Container>
      </Box>
    </>
  );
}

export default EnterpriseContente;
