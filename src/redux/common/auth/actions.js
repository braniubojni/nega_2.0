import { createAction } from "redux-actions";
import { LOG_OUT, SET_LOGGEDIN_USER, SET_USER_ROLE } from "../../actionTypes";

const setLoggedinUser = createAction(SET_LOGGEDIN_USER);
const setUserRole = createAction(SET_USER_ROLE);
const logOut = createAction(LOG_OUT);

export { logOut, setLoggedinUser, setUserRole };
