import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
/*
Our general flow for our actions will be as follows.
Import dependencies and action definitions from types.js
Use axios to make HTTPRequests within certain action
Use dispatch to send actions to our reducers
these are action creators as they return action objects and dispatch to store
*/
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData) => (dispatch) => {
  console.log("user data in register user action " , userData);
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      //?use dispatch to set value for resetting errors here?
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      //!cancel this before registering lots of users make sure to return it afterwards
      // re-direct to login on successful register
       window.location.href = "./login";
    }) 
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
