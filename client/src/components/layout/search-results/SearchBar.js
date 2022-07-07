///////////bla bla commit this number 2

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
// import {getSearchResults} from "../../../../utils/getHomes";
import { getSearchResults } from "../../../utils/getHomes";
import { setIsNavSearchShown } from "../../../actions/showNavSearchAction";
import { filterAll } from "../../../utils/filterUtils";
import { useNavigate } from "react-router-dom";
// import {getSearchResults} from "../../../../utils/getHomes";
//  import {getSearchResults} from "../../../actions/"; //?check for correct path?
// import {useDispatch, useSelector} from "react-redux";

const SearchBar = ({
  searchValue,
  setSearchValue,
  setFilteredHomes,
  desiredHomeType,
  filterDetailsObj,
  checkedAmneties,
  checkedLifeStyle,
}) => {
  //!get the search value from state here for default!
  // const [searchText, setSearchText] = useState(searchValue);
  const filterCounter = useSelector((state) => state.filterCounter);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //   const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const searchValue = useSelector((state) => state.searchResults);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    //  console.log( "this is in view",inView)
    inView
      ? dispatch(setIsNavSearchShown(false))
      : dispatch(setIsNavSearchShown(true));
    // inView && setInViewComponent("details-upload");
  }, [inView]);

  const handlePlaceSelected = (place, event) => {
    console.log("this is event value", event.value);
    // event.preventDefault();
    console.log("on place selected fired");
    console.log({ place });
    if (place !== undefined) {
      setSearchValue(place);
      console.log("entered place true condition", { place });
      searchHomes(place);
    } else {
      // console.log('entered else condition ', {searchText})
      searchHomes(event.value);
    }
  };

  const onTextChange = ({ target: { value } }) => {
    console.log(value);
    setSearchValue(value);
  };

  const searchHomes = async (searchText) => {
    // searchText = searchText.replace(', Israel', "");
    const foundHomes = await getSearchResults(searchText);
//only apply filter functionallity if we have filter active
console.log("found homes in search bar", foundHomes);
    if (filterCounter > 0 && foundHomes) {
      const finalFiltered = filterAll(
        foundHomes,
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      );
      setFilteredHomes(finalFiltered);
      navigate(`/search/${searchValue}`, {
        //!must fix value of state to match filtered? 
        state: { searchValue, foundHomes: finalFiltered },
      });
    } else setFilteredHomes(foundHomes? foundHomes: []);
    navigate(`/search/${searchValue}`, {
      //!must fix value of state to match filtered? 
      state: { searchValue, foundHomes: foundHomes },
    });
  };

  //make it as link tag even with router to navigate to /find-homes, - no need if i just use navigate()
  //use input tag to set state on change then onclick pass the state value as search value to api call

  return (
    <div className="search-box-container" ref={ref}>
      {/* <form action={`/api/search/${searchText}`} method="get"> */}
      {/* <input id="search" type="text" placeholder="Go anywhere" /> */}

      <Autocomplete
        // id="search-bar"
        className="search-box"
        apiKey={process.env.REACT_APP_MAPS_API_KEY}
        value={searchValue}
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
        onClick={() => searchHomes(searchValue)}
        variant="outlined"
        className="submit-search"
        type="submit"
      >
        <SearchIcon />
      </Button>
      {/* </form> */}
    </div>
  );
};

export default SearchBar;
