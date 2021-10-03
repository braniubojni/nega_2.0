import { createAction } from "redux-actions";
import { LOG_OUT, SET_LOGGEDIN_USER } from "../../actionTypes";

const setLoggedinUser = createAction(SET_LOGGEDIN_USER);
const logOut = createAction(LOG_OUT);

export { logOut, setLoggedinUser };
