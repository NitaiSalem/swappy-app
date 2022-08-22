import {
  SET_FILTER_DETAILS,
  SET_FILTER_HOMETYPE,
  SET_FILTER_AMNETIES,
  SET_FILTER_LIFESTYLE,
  SET_COUNTER,
} from "../actions/types";

const initialhomeTypeState = "";
const initialDetailsState = {};
const initialAmnetiesState = {};
const initialLifeStyleState = {};
const initialCounterState = 0;

export const homeTypeFilterReducer = (state = initialhomeTypeState, action) => {
  switch (action.type) {
    case SET_FILTER_HOMETYPE:
      return action.payload;
    default:
      return state;
  }
};

export const detailsFilterReducer = (state = initialDetailsState, action) => {
  switch (action.type) {
    case SET_FILTER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export const amnetiesFilterReducer = (state = initialAmnetiesState, action) => {
  switch (action.type) {
    case SET_FILTER_AMNETIES:
      return action.payload;
    default:
      return state;
  }
};

export const lifeStyleFilterReducer = (
  state = initialLifeStyleState,
  action
) => {
  switch (action.type) {
    case SET_FILTER_LIFESTYLE:
      return action.payload;
    default:
      return state;
  }
};

export const filterCounterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return action.payload;
    default:
      return state;
  }
};
