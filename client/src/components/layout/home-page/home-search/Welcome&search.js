import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../../../../utils/getHomes";
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setIsNavSearchShown } from "../../../../actions/showNavSearchAction";

const WelcomeSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    inView
      ? dispatch(setIsNavSearchShown(false))
      : dispatch(setIsNavSearchShown(true));
  }, [inView]);

  const onTextChange = ({ target: { value } }) => {
    console.log("on text change value", value);
    setSearchText(value);
  };

  const searchHomes = async (searchValue) => {
    await getSearchResults(searchValue);

    navigate(`/search/${searchValue}`, {
      state: { searchValue },
    });
  };

  const handlePlaceSelected = (place, event) => {
    //event.value gives us the entered text when autocomplete not used
    if (place) {
      setSearchText(place);
      searchHomes(place);
    } else {
      searchHomes(event.value);
    }
  };

  return (
    <div className="welcome-container">
      <h1 className="swappy-header">
        Discover Israel with <span style={{ color: "#e85710" }}> Swappy</span>
      </h1>

      <div className="search-home-container" ref={ref}>
        <h4 className="search-header">I'd love to go to</h4>
        <div className="search-boxes-container">
          <Autocomplete
            id="autocomplete"
            style={{ fontSize: "16px" }}
            className="search-box"
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
            placeholder="Enter destination"
            options={{
              componentRestrictions: { country: "isr" },
            }}
            onChange={onTextChange}
            onPlaceSelected={(place, event) =>
              handlePlaceSelected(place.formatted_address, event)
            }
          />

          <button
            onClick={() => searchHomes(searchText)}
            variant="success"
            className="submit-search-button"
          >
            <SearchIcon />
            Find my swaps
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
