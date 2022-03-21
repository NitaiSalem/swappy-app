import {combineReducers} from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import profileImgReducer from "./profileImgReducer";
import homeImgReducer from "./homeImgReducer";
import profileDetailsReducer from "./profileDetailsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profileImg: profileImgReducer,
  homeImages: homeImgReducer,
  homeDetails: profileDetailsReducer,
});

//here is auth!!!!!!!!!!!!!!!!
