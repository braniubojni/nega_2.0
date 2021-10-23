import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Slide1 from "./mainContent/Slide1";
import Slide2 from "./mainContent/Slide2";
import MainContent from "./mainContent/MainContent";
import Pricing from "./pricing/Pricing";
import { Route, Switch } from "react-router";
import {
  HOME_ROUTE,
  PRICING,
  RECOURCES,
  ENTERPRISE_ROUTE,
} from "../../constants/paths";
import Recorces from "./recoutces/Recources";
import Enterprise from "./enterprise/Enterprise";

function Home() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", fontFamily: "Roboto" }}
      >
        <Navbar />
        <Toolbar />
        <Switch>
          <Route exact path={HOME_ROUTE}>
            <MainContent />
          </Route>
          <Route
            exact
            path={ENTERPRISE_ROUTE}
            children={<Enterprise />}
          ></Route>
          <Route exact patch={RECOURCES} children={<Recorces />}></Route>
          <Route exact path={PRICING} children={<Pricing />}></Route>
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
