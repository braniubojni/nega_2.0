import { Switch, Route, Redirect } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../constants/paths";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Auth() {
  return (
    <Switch>
      <Route path={SIGN_IN_ROUTE}>
        <SignIn />
      </Route>

      <Route path={SIGN_UP_ROUTE}>
        <SignUp />
      </Route>

      <Redirect to={SIGN_IN_ROUTE} />
    </Switch>
  );
}

export default Auth;
