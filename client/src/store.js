import { createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["errors"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
