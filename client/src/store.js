import {createStore, applyMiddleware, compose} from "redux";
import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
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