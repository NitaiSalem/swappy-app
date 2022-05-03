///////////bla bla commit this number 2

import React, { useState } from "react";
import { Button } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import SearchIcon from '@mui/icons-material/Search';

// import {getSearchResults} from "../../../../utils/getHomes";
import { getSearchResults } from "../../../utils/getHomes";
// import {getSearchResults} from "../../../../utils/getHomes";
//  import {getSearchResults} from "../../../actions/"; //?check for correct path?
// import {useDispatch, useSelector} from "react-redux";

const SearchBar = ({ searchValue, setFilteredHomes }) => {
  //!get the search value from state here for default!
  const [searchText, setSearchText] = useState(searchValue);
  //   const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const searchValue = useSelector((state) => state.searchResults);

  const handlePlaceSelected = (place, event) => {
    console.log("this is event value", event.value);
    // event.preventDefault();
    console.log("on place selected fired");
    console.log({ place });
    if (place !== undefined) {
      setSearchText(place);
      console.log("entered place true condition", { place });
      searchHomes(place);
    } else {
      // console.log('entered else condition ', {searchText})
      searchHomes(event.value);
    }
  };

  const onTextChange = ({ target: { value } }) => {
    console.log(value);
    setSearchText(value);
  };

  const searchHomes = async (searchText) => {
    // searchText = searchText.replace(', Israel', "");
    const searchResults = await getSearchResults(searchText);

    console.log("this is search results in search barrrrrrrrrr", searchResults);
    setFilteredHomes(searchResults);
  };

  //make it as link tag even with router to navigate to /find-homes, - no need if i just use navigate()
  //use input tag to set state on change then onclick pass the state value as search value to api call

  return (
    <div className="search-box-container">
      {/* <form action={`/api/search/${searchText}`} method="get"> */}
      {/* <input id="search" type="text" placeholder="Go anywhere" /> */}

      <Autocomplete
        // id="search-bar"
        apiKey={process.env.REACT_APP_MAPS_API_KEY}
        value={searchText}
        placeholder=" Where to?"
        options={{
          componentRestrictions: { country: "isr" },
        }}
        onChange={onTextChange}
        onPlaceSelected={(place, event) =>
          handlePlaceSelected(place.formatted_address, event)
        }
        //* onPlaceSelected={(place) => setSearchText(place.formatted_address)}
        // onPlaceSelected= {(place) => setSearchText(place.formatted_address.replace(', Israel', ""))}

        // onKeyDown={async ({ code }) => {
        //   //!enter here searches the text entered before the autocomplete
        //   if (code === "Enter") {
        //     console.log("this is search text ", searchText);
        //     searchHomes(searchText);
        //   }
        // }}
      />

      <Button
        onClick={() => searchHomes(searchText)}
        variant="outlined"
        className="submit-search"
        type="submit"
      >
      <SearchIcon/>
      </Button>
      {/* </form> */}
    </div>
  );
};

export default SearchBar;
