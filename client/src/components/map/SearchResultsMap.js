// import "./map.scss";
// import {
//   withGoogleMap,
//   //   GoogleMap,
//   withScriptjs,
//   //   Marker,
// } from "react-google-maps";
// import Autocomplete from "react-google-autocomplete";
// import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MarkerComponent from "./Marker";

// const API_Key = process.env.REACT_APP_MAPS_API_KEY;

// const API_Key = "AIzaSyCNCCBfPWacmsiS7eACHMaAgp2VeIornQI";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const SearchResultsMap = ({ mappedHouses, goToUser }) => {
  // const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: 'Your Google API Key' })

  //   let markerPosition = {
  //     lat: houseLocation.lat,
  //     lng: houseLocation.lng,
  //   };

  //   console.log(houseLocation, " this is houselocation, means map rendered ");

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 32.077860051007875, lng: 34.77854258203124 }}
      zoom={10}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      <MarkerComponent mappedHouses={mappedHouses} goToUser={goToUser} />
    </GoogleMap>
  );
};

export default memo(SearchResultsMap);
