import {SET_IS_NAV_SEARCH_SHOWN} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_IS_NAV_SEARCH_SHOWN:
        return action.payload;
      default:
        return state;
    }
  }