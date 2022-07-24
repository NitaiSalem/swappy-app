import React, { useEffect, useState } from "react";
import "./welcome.style.scss";
// import { Button } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../../../../utils/getHomes";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setIsNavSearchShown } from "../../../../actions/showNavSearchAction";

// import {getSearchResults} from "../../../../actions/searchActions";
// import {useDispatch, useSelector} from "react-redux";

const WelcomeSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const dispatch = useDispatch();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    //  console.log( "this is in view",inView)
    inView? dispatch(setIsNavSearchShown(false)): dispatch(setIsNavSearchShown(true));
    // inView && setInViewComponent("details-upload");
  }, [inView]);


  const onTextChange = ({ target: { value } }) => {
    console.log("on text change value", value);
    setSearchText(value);
  };

  const searchHomes = async (searchValue) => {
    const searchResults = await getSearchResults(searchValue);
    // console.log("this is searchvalue in search homes func", searchValue);
    // console.log("this is search results in search homes func", searchResults);
    navigate(`/search/${searchValue}`, {
      state: { searchValue, foundHomes: searchResults },
    });
  };

  // const searchHomes = async (searchValue) => {
  //   const searchResults = await getSearchResults(searchValue);
  //   // console.log("this is searchvalue in search homes func", searchValue);
  //   // console.log("this is search results in search homes func", searchResults);
  //   navigate(`/search/${searchValue}`, {
  //     state: { searchValue, foundHomes: searchResults },
  //   });
  // };


  const handlePlaceSelected = (place, event) => {
    console.log("this is event value", event.value);
    // event.preventDefault();
    console.log("on place selected fired");
    console.log({ place });
    if (place) {
      setSearchText(place);
      console.log("entered place true condition", { place });
      searchHomes(place);
    } else {
      // console.log('entered else condition ', {searchText})
      searchHomes(event.value);
    }
  };

  //make it as link tag even with router to navigate to /find-homes, - no need if i just use navigate()
  //use input tag to set state on change then onclick pass the state value as search value to api call

  return (
    <div className="welcome-container">
      <h1 className="swappy-header">
        Discover Israel with <span style={{ color: "#e85710" }}> Swappy</span>
      </h1>

      <div className="search-home-container" ref={ref}>
        {/* <form autoComplete="off"> */}
        {/* <form action={`/api/search/${searchText}`} method="get"> */}
        <h4 className="search-header">I'd love to go to</h4>
        {/* <input id="search" type="text" placeholder="Go anywhere" /> */}
        <div className="search-boxes-container">
        <Autocomplete
         style={{ fontSize: "16px" }}
          // value={searchText}
          className="search-box"
          // apiKey={process.env.REACT_APP_MAPS_API_KEY}
          placeholder="Enter destination"
          options={{
            componentRestrictions: { country: "isr" },
          }}
          onChange={onTextChange}
          // onPlaceSelected= {(place) => setSearchText(place.formatted_address)}
          onPlaceSelected={(place, event) =>
            handlePlaceSelected(place.formatted_address, event)
          }

          //!must create separation between cases if we get the place obj or just plain text from our state
          // onPlaceSelected={(place) =>{console.log('on place selected fired');  setSearchText(place.formatted_address) }

          //!it stays only as what i typed not full adress
          // setSearchText(place.formatted_address.replace(', Israel', ""))

          // }
          //?possibly useffect to avoid the async problem?
          // onPlaceSelected={onPlaceSelected}
          // onKeyUp={({ code }) => {

          //   if (code === "Enter") {

          //     searchHomes(searchText);
          //   }
          // }}
        />

        <button
          onClick={() => searchHomes(searchText)}
          variant="success"
          className="submit-search-button"
          // type="submit"
        >
          <SearchIcon/>
          Find my swaps
        </button>
        {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
