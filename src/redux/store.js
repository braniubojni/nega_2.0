import { combineReducers, createStore, applyMiddleware } from "redux";
import auth from "./common/auth/reducer";
import channel from "./common/channel/reducer";
import user from "./common/user/reducer";
import thunk from "./common/auth/thunk";

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
