import { Toolbar } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useHistory } from "react-router";
import { CHANNELS_ROUTE, SIGN_IN_ROUTE } from "../../constants/paths";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Slide1 from "./mainContent/Slide1";
import Slide2 from "./mainContent/Slide2";
import MainContent from "./mainContent/MainContent";

// const MainWrapper = styled();

function Home() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", fontFamily: "Roboto" }}
      >
        <Navbar />
        <Toolbar />
        <MainContent />
        <Box>
          <Slide1 />
          <Slide2 />
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Home;
