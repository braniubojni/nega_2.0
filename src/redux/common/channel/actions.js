import { createAction } from "redux-actions";
import { SET_CHANNEL_INFO, REMOVE_CHANNEL_INFO } from "../../actionTypes";

const setChannelInfo = createAction(SET_CHANNEL_INFO);
const removeChannelInfo = createAction(REMOVE_CHANNEL_INFO);

export { setChannelInfo, removeChannelInfo };
