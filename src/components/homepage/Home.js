import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Slide1 from "./mainContent/Slide1";
import Slide2 from "./mainContent/Slide2";
import MainContent from "./mainContent/MainContent";
import { Route, Switch } from "react-router";
import {
  HOME_ROUTE,
  PRICING_ROUTE,
  ENTERPRISE_ROUTE,
  RESOURCES_ROUTE,
} from "../../constants/paths";
import Pricing from "./pricing/Pricing";
import Resources from "./resources/Resources";
import Enterprise from "./enterprise/Enterprise";

function Home() {
  console.log(RESOURCES_ROUTE);
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", fontFamily: "Roboto" }}
      >
        <Navbar />
        <Toolbar />
        <Switch>
          <Route exact path={HOME_ROUTE} children={<MainContent />} />
          <Route exact path={ENTERPRISE_ROUTE} children={<Enterprise />} />
          <Route exact path={RESOURCES_ROUTE} children={<Resources />} />
          <Route exact path={PRICING_ROUTE} children={<Pricing />} />
        </Switch>
        <Box>
          <Box>
            <Slide1 />
            <Slide2 />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Home;
