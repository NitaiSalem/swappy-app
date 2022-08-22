import axios from "axios";

import { SET_HOME_IMG, SET_PROFILE_IMG, SET_HOME_DETAILS } from "./types";

export const setProfileImg = (img) => {
  return {
    type: SET_PROFILE_IMG,
    payload: img,
  };
};

export const setHomeImg = (img) => {
  return {
    type: SET_HOME_IMG,
    payload: img,
  };
};

export const setHomeDetails = (details) => {
  return {
    type: SET_HOME_DETAILS,
    payload: details,
  };
};

export const uploadHomeDetails = (userData) => async (dispatch) => {
  try {
    await axios.post("/api/user-edit-details/home-details", userData);
    dispatch(setHomeDetails(userData));
  } catch (err) {
    console.error(err);
  }
};

export const uploadProfileImage = (profileImg) => async (dispatch) => {
  try {
//?change from localhost? 

    await axios.post(
      "/api/user-edit-images/profile-image",
      profileImg
    );
    dispatch(getProfileImg());
  } catch (err) {
    console.error(err);
  }
};

export const uploadHomeImages = (homeImages) => async (dispatch) => {
  try {
    await axios.post(
      "/api/user-edit-images/home-images",
      homeImages
    );
    dispatch(getHomeImages());
  } catch (err) {
    console.error(err);
  }
};

export const getHomeDetails = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/user-edit-details/home-details");
    dispatch(setHomeDetails(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const getProfileImg = () => async (dispatch) => {
  const response = await axios.get("/api/user/profile-image");
  dispatch(setProfileImg(response.data));
};

export const getHomeImages = () => async (dispatch) => {
  const response = await axios.get("/api/user/home-images");
  dispatch(setHomeImg(response.data));
};
