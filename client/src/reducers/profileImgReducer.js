import {SET_PROFILE_IMG} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_IMG:
      return action.payload;
    default:
      return state;
  }
}
