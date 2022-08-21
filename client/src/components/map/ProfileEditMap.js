//import GoogleMapReact from "google-map-react";
// import {
//   withGoogleMap,
//   //   GoogleMap,
//   withScriptjs,
//   //   Marker,
// } from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import {
  GoogleMap,
//   useJsApiLoader,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

const API_Key = process.env.REACT_APP_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "250px",
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

Geocode.setApiKey(API_Key);
Geocode.enableDebug();

const NewMap = ({ setInViewComponent, houseLocation, setHouseLocation }) => {
  // const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: 'Your Google API Key' })

  let markerPosition = {
    lat: houseLocation.lat,
    lng: houseLocation.lng,
  };
  const [map, setMap] = useState(null);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  let address = houseLocation.address;
  console.log(address, " this is address, means map rendered ");

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const onMarkerClick = () => {
    console.log("marker clicked");
  };

  const onPlaceSelected = useCallback((place) => {
    if (place.formatted_address) {
      console.log("place here", place);
      let updatedAddress = place.formatted_address;
      let addressArray = place.address_components;
      const area = getArea(addressArray);
      const latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      console.log("latvalue", latValue);
      console.log("lngValue", lngValue);
      setHouseLocation({
        lat: latValue,
        lng: lngValue,
        address: updatedAddress ? updatedAddress : "",
        area: area ? area : "",
      });
    }
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    console.log("darg end", event);
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        console.log(response, "this is the response from geocode onmarkerdrag");
        let updatedAddress = response.results[0].formatted_address,
          addressArray = response.results[0].address_components;
        const area = getArea(addressArray);
        console.log(area, " area in onmarkerdragend");
        setHouseLocation({
          lat: newLat,
          lng: newLng,
          address: updatedAddress ? updatedAddress : "",
          area: area ? area : "",
          //add city here?
        }); //this causing double render!
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    inView && setInViewComponent("location-upload");
  }, [inView]);

  return (
    <div id="location-upload" ref={ref} className="panel">
      <div className="panel-heading-container">
        <h3>Location</h3>
      </div>
      <div className="panel-body">
        <h3 className="panel-body-title">Address</h3>
        <p className="location-explanation-text">
          Your address is used to provide a general location for your home. To
          protect your information, on the public map, we use what you enter
          below to create a rough boundary and randomly place a pin to show
          where to find your home.
        </p>

        {/* <LoadScript googleMapsApiKey={API_Key}> */}
          <Autocomplete
             apiKey={API_Key}
            className="location-autocomplete"
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: "isr" },
            }}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              margin: "12px 0 12px 0",
            }}
            onPlaceSelected={onPlaceSelected}
          />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: markerPosition.lat, lng: markerPosition.lng }}
            zoom={11}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          >
            <Marker
              // className="marker-class-here"
              onClick={onMarkerClick}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
              position={{
                lat: markerPosition.lat,
                lng: markerPosition.lng,
              }}
            />
            <Marker />
          </GoogleMap>
        {/* </LoadScript> */}
      </div>
    </div>
  );
};

export default memo(NewMap);
