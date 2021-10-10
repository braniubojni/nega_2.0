import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import { SET_USER_INFO } from "../../actionTypes";

const initial = initialState.user;

const reducer = handleActions(
  {
    [SET_USER_INFO]: (state, { payload }) => {
      return {
        ...state,
        userId: payload.userId,
        userName: payload.userName,
      };
    },
  },
  initial
);

export default reducer;
