import axios from "axios";

export const getSearchResults = async (searchValue) => {
  try {
    const response = await axios.get(`/api/search/${searchValue}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
