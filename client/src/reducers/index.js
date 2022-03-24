import {combineReducers} from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import profileImgReducer from "./profileImgReducer";
import homeImgReducer from "./homeImgReducer";
import profileDetailsReducer from "./profileDetailsReducer";
import { amnetiesFilterReducer, detailsFilterReducer, homeTypeFilterReducer, lifeStyleFilterReducer,filterCounterReducer } from "./filterReducers";



export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profileImg: profileImgReducer,
  homeImages: homeImgReducer,
  homeDetails: profileDetailsReducer,
  homeTypeFilter:homeTypeFilterReducer, 
  detailsFilter:detailsFilterReducer, 
  amnetiesFilter: amnetiesFilterReducer, 
  lifeStyleFilter:lifeStyleFilterReducer,
  filterCounter:filterCounterReducer, 
});

//here is auth!!!!!!!!!!!!!!!!
