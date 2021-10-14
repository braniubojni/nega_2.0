import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import { SETVIDEO } from "../../actionTypes/video";

const initial = initialState.video;

const reducer = handleActions(
  {
    [SETVIDEO]: (state, { payload }) => {
      return {
        ...state,
        videoId: payload,
      };
    },
  },
  initial
);

export default reducer;
