import { handleActions } from "redux-actions";
import initialState from "../../initialState";
import { SET_CHANNEL_INFO, REMOVE_CHANNEL_INFO } from "../../actionTypes";

const initial = initialState.channel;

const reducer = handleActions(
  {
    [SET_CHANNEL_INFO]: (state, { payload }) => {
      return {
        ...state,
        channelId: payload.channelId,
        channelName: payload.channelName,
      };
    },
    [REMOVE_CHANNEL_INFO]: (state) => {
      return {
        ...state,
        channelId: null,
        channelName: null,
      };
    },
  },
  initial
);

export default reducer;
