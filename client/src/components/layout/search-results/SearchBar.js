import React, { memo, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../../utils/getHomes";
import { setIsNavSearchShown } from "../../../actions/showNavSearchAction";
import { filterAll } from "../../../utils/filterUtils";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchHomes,
  searchValue,
  setSearchValue
}) => {
  // const filterCounter = useSelector((state) => state.filterCounter);
  const checkedLifeStyle = useSelector((state) => state.lifeStyleFilter);
  const desiredHomeType = useSelector((state) => state.homeTypeFilter);
  const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  const filterDetailsObj = useSelector((state) => state.detailsFilter);

  // console.log("render of search bar!")
  // console.log("calue of checkamneties on top of search bar!", checkedAmneties)
  // const filterCounter = useSelector((state) => state.filterCounter);
  // const checkedAmneties = useSelector((state) => state.amnetiesFilter);
  // console.log(
  //   "value of checked amneties from props  on render on top in searchbar: ",
  //   { checkedAmneties }
  // );
  // console.log("filtercounter value on top declaration: ", filterCounter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  // const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    //  console.log( "this is in view",inView)
    inView
      ? dispatch(setIsNavSearchShown(false))
      : dispatch(setIsNavSearchShown(true));
  }, [inView]);


  const handlePlaceSelected = (place, event) => {

    // console.log("value of checked amneties in searchbar comp handleplaceselected:" , checkedAmneties)
    // console.log("place passed to search homes: ", place);
    // console.log("event value passed to search homes: ", place);

    if (place !== undefined) {
      setSearchValue(place);
      // console.log("entered handleplace true condition", { place });
      searchHomes(
        place
      );
    } else {
      searchHomes(
        event.value
      );
    }
  };

  // const handlePlaceSelected = (place) => {
  //   if (place !== undefined) {
  //     fetchHomes(place);

  //     setSearchValue(place);
  //     console.log("entered place : ", { place });
  //   }
  //   // setIsSelected(true);
  // };

  const onTextChange = ({ target: { value } }) => {
    setSearchValue(value);
  };


  return (
    <div className="search-box-container" ref={ref}>
      <Autocomplete
        id="autocomplete"
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
        // onPlaceSelected={(place) =>
        //   handlePlaceSelected(place.formatted_address)
        // }
      />
      {/* <input
           className="search-box"
           value={searchValue}
           placeholder=" Where to?"
           onChange={onTextChange}
           onKeyDown = {(e) => {(e.key === 'Enter' && searchHomes(searchValue))}}

      />  */}

      <Button
        onClick={() =>
          searchHomes(
            searchValue
          )
        }
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

export default memo(SearchBar);
