//import GoogleMapReact from "google-map-react";
import "./map.scss";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Circle,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {memo, useCallback, useEffect} from "react";

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

  // useEffect(() => {
  //   function fetchLocation() {
  //     try {
  //       Geocode.fromLatLng(markerPosition.lat, markerPosition.lng).then(
  //         (response) => {

  //         }
  //       );
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchLocation();
  // }, []);

  // const onMarkerDragEnd = useCallback((event) => {
  //   console.log("event", event);
  //   let newLat = event.latLng.lat(),
  //     newLng = event.latLng.lng();
  //   Geocode.fromLatLng(newLat, newLng).then(
  //     (response) => {
  //       console.log(response, "this is the response from geocode onmarkerdrag");
  //       let updatedAddress = response.results[0].formatted_address;
  //       props.setHouseLocation({
  //         lat: newLat,
  //         lng: newLng,
  //         address: updatedAddress ? updatedAddress : "",
  //       }); //this causing double render!
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, []);

  return (
    <div>
      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_Key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={
          <div style={{height: props.height, marginBottom: "150px"}} />
        }
        mapElement={<div style={{height: `100%`}} />}
        zoom={zoom}
      />
    </div>
  );
};

export default memo(HomeMap);
