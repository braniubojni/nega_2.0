import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import { LOG_OUT, SET_LOGGEDIN_USER } from "../../actionTypes";

const initial = initialState.auth;

const reducer = handleActions(
  {
    [SET_LOGGEDIN_USER]: (state, { payload }) => {
      return {
        ...state,
        loggedInUser: payload,
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
