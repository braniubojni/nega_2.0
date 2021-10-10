import { createAction } from "redux-actions";
import { SET_USER_INFO } from "../../actionTypes";

const setUserInfo = createAction(SET_USER_INFO);

export { setUserInfo };
