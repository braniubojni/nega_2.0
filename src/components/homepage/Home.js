import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Slide1 from "./mainContent/Slide1";
import Slide2 from "./mainContent/Slide2";
import MainContent from "./mainContent/MainContent";
import Pricing from "./pricing/Pricing";
import { Route, Switch, useLocation, useParams } from "react-router";
import { HOME_ROUTE } from "../../constants/paths";

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
            <Box>
              <Slide1 />
              <Slide2 />
            </Box>
            <Box>
              <Slide1 />
            </Box>
          </Route>
          <Route exact path="/pricing" children={<Pricing />}></Route>
        </Switch>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
// <Redirect to={HOME_ROUTE} />

export default Home;
