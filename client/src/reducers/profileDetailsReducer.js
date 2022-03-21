
import {SET_HOME_DETAILS} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_HOME_DETAILS:
        return action.payload;
      default:
        return state;
    }
  }