import { styled } from "@mui/system";

const ImgLogo = styled("img")(({ theme }) => ({
  minWidth: "15%",
  maxWidth: 150,
}));

const ImgContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 0",
}));

const FlexContainer = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  margin: "0 50px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}));

export { ImgLogo, ImgContainer, FlexContainer };
