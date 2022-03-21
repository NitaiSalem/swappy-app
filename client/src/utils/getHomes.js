import axios from "axios";

// export const getHomes = async (searchValue) => {
//   const response = await axios.get(`/api/search/${searchValue}`);
//   console.log({response});
//   return response;
//   // export const getProfileImg = () => async (dispatch) => {
//   //   const response = await axios.get("/api/user/profile-image");
//   //   dispatch(setProfileImg(response.data));
//   // };
// };

export const getSearchResults = async (searchValue) => {
  try {
    const response = await axios.get(`/api/search/${searchValue}`);
    console.log(response.data, " the response data in gethomedetails");
    return response.data;
    // dispatch(setSearchResults(response.data));
  } catch (err) {
    console.error(err);
  }
};
