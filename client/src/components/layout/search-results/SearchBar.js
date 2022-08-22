import React, { memo, useEffect } from "react";
import { Button } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import { useDispatch} from "react-redux";
import { setIsNavSearchShown } from "../../../actions/showNavSearchAction";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchHomes,
  searchValue,
  setSearchValue
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    inView
      ? dispatch(setIsNavSearchShown(false))
      : dispatch(setIsNavSearchShown(true));
  }, [inView]);


  const handlePlaceSelected = (place, event) => {

    if (place !== undefined) {
      setSearchValue(place);
      searchHomes(
        place
      );
    } else {
      searchHomes(
        event.value
      );
    }
  };

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
      />
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
    </div>
  );
};

export default memo(SearchBar);
