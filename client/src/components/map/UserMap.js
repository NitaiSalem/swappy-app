import "./map.scss";
// import {
//   withGoogleMap,
//   //   GoogleMap,
//   withScriptjs,
//   //   Marker,
// } from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import {
  GoogleMap,
  Circle,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "250px",
};

const UserMap = ({  houseLocation  }) => {

  let markerPosition = {
    lat: houseLocation.lat,
    lng: houseLocation.lng,
  };


  return (
    <div >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: markerPosition.lat, lng: markerPosition.lng }}
            zoom={14}
          >
         <Circle
            center={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
            radius={400}
          />
          <Circle />
          </GoogleMap>
      </div>
  );
};

export default memo(UserMap);
