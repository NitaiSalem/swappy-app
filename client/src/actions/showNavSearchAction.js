import { SET_IS_NAV_SEARCH_SHOWN } from "./types";


export const setIsNavSearchShown = (value) => {
    return {
      type: SET_IS_NAV_SEARCH_SHOWN,
      payload: value,
    };
  };
  