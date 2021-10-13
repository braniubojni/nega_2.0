import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Slide1 from "./mainContent/Slide1";
import Slide2 from "./mainContent/Slide2";
import MainContent from "./mainContent/MainContent";

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
