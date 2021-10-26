import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./common/auth/reducer";
import channel from "./common/channel/reducer";

const reducer = combineReducers({
  auth,
  channel,
});

const RootReducer = (state, action) => {
  return reducer(state, action);
};

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
