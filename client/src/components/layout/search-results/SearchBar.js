
import React, { useEffect } from "react";
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
  searchValue,
  setSearchValue,
  setFilteredHomes,
  desiredHomeType,
  filterDetailsObj,
  checkedAmneties,
  checkedLifeStyle,
}) => {
  const filterCounter = useSelector((state) => state.filterCounter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    //  console.log( "this is in view",inView)
    inView
      ? dispatch(setIsNavSearchShown(false))
      : dispatch(setIsNavSearchShown(true));
  }, [inView]);

  const handlePlaceSelected = (place, event) => {
    if (place !== undefined) {
      setSearchValue(place);
      console.log("entered place true condition", { place });
      searchHomes(place);
    } else {
      searchHomes(event.value);
    }
  };

  const onTextChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const searchHomes = async (searchText) => {
    const foundHomes = await getSearchResults(searchText);
// console.log("found homes in search bar", foundHomes);
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
        //must fix value of state to match filtered 
        state: { searchValue, foundHomes: finalFiltered },
      });
    } else setFilteredHomes(foundHomes? foundHomes: []);
    navigate(`/search/${searchValue}`, {
      state: { searchValue, foundHomes: foundHomes },
    });
  };


  return (
    <div className="search-box-container" ref={ref}>
      <Autocomplete
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
