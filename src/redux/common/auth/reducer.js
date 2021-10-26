import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import {
  CLEAN_ERROR,
  LOG_OUT,
  SET_ERROR,
  SET_LOGGEDIN_USER,
  SET_USER_ROLE,
} from "../../actionTypes";

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
    [CLEAN_ERROR]: (state) => {
      return {
        ...state,
        error: null,
      };
    },
    [LOG_OUT]: (state) => {
      return {
        ...state,
        loggedInUser: null,
      };
    },
    [SET_ERROR]: (state, { payload }) => {
      return {
        ...state,
        error: payload,
      };
    },
  },
  initial
);

export default reducer;
