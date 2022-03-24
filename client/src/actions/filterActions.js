
import {SET_FILTER_DETAILS,SET_FILTER_HOMETYPE,SET_FILTER_AMNETIES, SET_FILTER_LIFESTYLE, SET_COUNTER} from "./types";


export const setFilterDetails = (details) => {
    return {
      type: SET_FILTER_DETAILS,
      payload: details,
    };
  };
  

  export const setFilterHomeType = (type) => {
    return {
      type: SET_FILTER_HOMETYPE,
      payload: type,
    };
  };
  
  export const setFilterAmneties = (amneties) => {
    return {
      type: SET_FILTER_AMNETIES,
      payload: amneties,
    };
  };
  

  export const setFilterLifeStyle = (lifeStyle) => {
    return {
      type: SET_FILTER_LIFESTYLE,
      payload: lifeStyle,
    };
  };
  
  export const setFilterCounter = (counter) => {
    return {
      type: SET_COUNTER,
      payload: counter,
    };
  };
  



  //need to add error cases?
  
  //make get request method here and handle in server, must use when profile is rendered otherwise data wont show.
  
  export const updateFilterValues = (homeType, details, amneties,lifeStyle) =>  (dispatch) => {

    dispatch(setFilterHomeType(homeType));
    dispatch(setFilterDetails(details));
    dispatch(setFilterAmneties(amneties));
    dispatch(setFilterLifeStyle(lifeStyle));
  };
  