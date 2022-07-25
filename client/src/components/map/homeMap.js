import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Circle,
} from "react-google-maps";
import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {memo} from "react";

const API_Key = process.env.REACT_APP_MAPS_API_KEY;
Geocode.setApiKey(API_Key);
Geocode.enableDebug();

const HomeMap = (props) => {
  const zoom = 13;
  let markerPosition = {
    lat: props.houseLocation.lat,
    lng: props.houseLocation.lng,
  };
  console.log("this is a render of home-map");
  const AsyncMap = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap
        google={window.google}
          defaultZoom={zoom}
          defaultCenter={{
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          }}
        >
          {/* <Marker
            draggable={false}
            position={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
          />
          <Marker /> */}

          <Circle
            // draggable={false}
            defaultCenter={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
            radius={500}
          />
          <Circle />
        </GoogleMap>
      );
    })
  );


  return (
    <div>
      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_Key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={
          <div style={{height: props.height}} />
        }
        mapElement={<div style={{height: `100%`, borderRadius:"3px" }} />}
        zoom={zoom}
      />
    </div>
  );
};

export default memo(HomeMap);
