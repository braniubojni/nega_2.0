import { createAction } from "redux-actions";
import { SETVIDEO } from "../../actionTypes/video";

const setVideo = createAction(SETVIDEO);

export { setVideo };
