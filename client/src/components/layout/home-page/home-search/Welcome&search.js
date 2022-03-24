import React, {useState} from "react";
import "./welcome.style.scss";
import {Button} from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import {useNavigate} from "react-router-dom";
import {getSearchResults} from "../../../../utils/getHomes";
// import {getSearchResults} from "../../../../actions/searchActions";
// import {useDispatch, useSelector} from "react-redux";

const WelcomeSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const searchResults = useSelector((state) => state.searchResults);

  const onTextChange = ({target: {value}}) => {
    console.log(value);
    setSearchText(value);
  };

  const searchHomes = async (searchValue) => {
    // const foundHomes = await
    // await dispatch(getSearchResults(searchValue));
    // const searchResults = await getSearchResults(searchValue);
    // console.log("this is search results in search homes func", searchResults);
    const searchResults = await getSearchResults(searchValue);

    console.log("this is search results in search homes func", searchResults);
    navigate(`/search/${searchValue}`, {state: {searchValue,foundHomes: searchResults}});
  };

  //make it as link tag even with router to navigate to /find-homes, - no need if i just use navigate()
  //use input tag to set state on change then onclick pass the state value as search value to api call

  return (
    <div className="welcome-container">
      <h1 id="header">
        Explore Israel with <span style={{color: "#DB8200"}}> Homies</span>
      </h1>

      <div className="search-form-container">
        {/* <form action={`/api/search/${searchText}`} method="get"> */}
        <p className="search-header">I'd love to go to</p>
        {/* <input id="search" type="text" placeholder="Go anywhere" /> */}
        <Autocomplete
          id="search"
          apiKey={process.env.REACT_APP_MAPS_API_KEY}
          placeholder="Go anywhere"
          options={{
            componentRestrictions: {country: "isr"},
          }}
          onChange={onTextChange}
          // onPlaceSelected={onPlaceSelected}
        />

        <Button
          onClick={() => searchHomes(searchText)}
          variant="success"
          className="submit-search"
          type="submit"
        >
          Find my Homies
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default WelcomeSection;


