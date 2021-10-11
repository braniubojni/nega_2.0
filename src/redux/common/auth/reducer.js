import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import { LOG_OUT, SET_LOGGEDIN_USER, SET_USER_ROLE } from "../../actionTypes";

const initial = initialState.auth;

const reducer = handleActions(
  {
    [SET_LOGGEDIN_USER]: (state, { payload }) => {
      return {
        ...state,
        loggedInUser: payload,
      };
    },
    [SET_USER_ROLE]: (state, { payload }) => {
      return {
        ...state,
        isAdmin: payload,
      };
    },
    [LOG_OUT]: (state) => {
      return {
        ...state,
        loggedInUser: null,
      };
    },
  },
  initial
);

export default reducer;
