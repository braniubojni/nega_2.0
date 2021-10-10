import { combineReducers, createStore } from "redux";
import auth from "./common/auth/reducer";
import channel from "./common/channel/reducer";
import user from "./common/user/reducer";

const reducer = combineReducers({
  auth,
  user,
  channel,
});

const RootReducer = (state, action) => {
  return reducer(state, action);
};

const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
