import {SET_HOME_IMG} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_HOME_IMG:
        return action.payload;
      default:
        return state;
    }
  }