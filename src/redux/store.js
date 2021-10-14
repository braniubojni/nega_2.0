import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./common/auth/reducer";
import channel from "./common/channel/reducer";
import user from "./common/user/reducer";
import video from "./common/video/reducer";

const reducer = combineReducers({
  auth,
  user,
  channel,
  video,
});

const RootReducer = (state, action) => {
  return reducer(state, action);
};

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
