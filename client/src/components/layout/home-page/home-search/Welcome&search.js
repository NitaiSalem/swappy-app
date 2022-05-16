import React, { useState } from "react";
import "./welcome.style.scss";
import { Button } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../../../../utils/getHomes";
// import {getSearchResults} from "../../../../actions/searchActions";
// import {useDispatch, useSelector} from "react-redux";

const WelcomeSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const searchResults = useSelector((state) => state.searchResults);

  const onTextChange = ({ target: { value } }) => {
    console.log('on text change value', value);
    setSearchText(value);
  };

  const searchHomes = async (searchValue) => {
    // const foundHomes = await
    // await dispatch(getSearchResults(searchValue));
    // const searchResults = await getSearchResults(searchValue);
    // searchValue = searchValue.replace(', Israel', "");
    // searchValue = searchValue.replace(', Israel', ""); 
    
    const searchResults = await getSearchResults(searchValue);
    
    console.log("this is searchvalue in search homes func", searchValue);
    console.log("this is search results in search homes func", searchResults);
    navigate(`/search/${searchValue}`, {
      state: { searchValue, foundHomes: searchResults },
    });
  };

  const handlePlaceSelected = (place,event)=> {
    console.log( 'this is event value' ,event.value); 
    // event.preventDefault(); 
    console.log('on place selected fired'); 
    console.log({place});   
    if(place !== undefined){
      setSearchText(place); 
    console.log('entered place true condition', {place})
      searchHomes(place)
    }
  
else  {
  // console.log('entered else condition ', {searchText})
  searchHomes(event.value); 
}

  }

  //make it as link tag even with router to navigate to /find-homes, - no need if i just use navigate()
  //use input tag to set state on change then onclick pass the state value as search value to api call

  return (
    <div className="welcome-container">
      <h1 id="header">
        Explore Israel with <span style={{ color: "#DB8200" }}> Swappy</span>
      </h1>

      <div className="search-form-container">
        {/* <form autoComplete="off"> */}
        {/* <form action={`/api/search/${searchText}`} method="get"> */}
        <p className="search-header">I'd love to go to</p>
        {/* <input id="search" type="text" placeholder="Go anywhere" /> */}
        <Autocomplete
          // value={searchText}
          id="search"
          apiKey={process.env.REACT_APP_MAPS_API_KEY}
          placeholder="Go anywhere"
          options={{
            componentRestrictions: { country: "isr" },
          }}
          onChange={onTextChange}
          // onPlaceSelected= {(place) => setSearchText(place.formatted_address)}
          onPlaceSelected={(place,event)=> handlePlaceSelected(place.formatted_address,event) }

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

        <Button
          onClick={() => searchHomes(searchText)}
          variant="success"
          className="submit-search"
          // type="submit"
        >
          Find my swaps
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default WelcomeSection;
