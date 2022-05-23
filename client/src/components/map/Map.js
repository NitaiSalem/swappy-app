//import GoogleMapReact from "google-map-react";
import "./map.scss";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect } from "react";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
const API_Key = process.env.REACT_APP_MAPS_API_KEY;
Geocode.setApiKey(API_Key);
Geocode.enableDebug();

const Map = ({
  setInViewComponent,
  houseLocation,
  setHouseLocation,
  height,
}) => {
  const zoom = 13;
  let markerPosition = {
    lat: houseLocation.lat,
    lng: houseLocation.lng,
  };
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  let address = houseLocation.address;
  console.log(address, " this is address, means map rendered ");
  // const onChange = (event) => {
  //   // setState({[event.target.name]: event.target.value});
  // };

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

  const AsyncMap = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={{
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          }}
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
      );
    })
  );

  const onMarkerDragEnd = useCallback((event) => {
    console.log("event", event);
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
    <div id="location-upload" ref={ref}>
      <h3>Search Location below:</h3>
      <Autocomplete
        options={{
          types: [["address"], ["cities"]],
          componentRestrictions: { country: "isr" },
        }}
        style={{
          width: "100%",
          height: "40px",
          paddingLeft: "16px",
          marginTop: "2px",
        }}
        onPlaceSelected={onPlaceSelected}
      />
      <div className="form-group">
        <label htmlFor="">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          readOnly="readOnly"
          value={address}
        />
      </div>
      {/* check googlemapurl for options in api call */}
      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_Key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: height, marginBottom: "150px" }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
        zoom={zoom}
      />
    </div>
  );
};

export default memo(Map);

// const LocationPin = ({ text }) => (
//     <div className="pin">
//       <FontAwesomeIcon icon='map-marker-alt' className="pin-icon" />
//       <p className="pin-text">{text}</p>
//     </div>
//   )

// const Map = () => {
//   //location and zoomlevel meant to be passed as props..
//   const location = {
//     address: "Kdoshei Mitsrayim 14, Yehud",
//     lat: 32.034269,
//     lng: 34.888944,
//   };
//   const zoomLevel = 17;

//   const API_Key = process.env.REACT_APP_MAPS_API_KEY;
//   console.log(process.env, "process env")

//   return (
//     <div className="map">
//       <h2 className="map-h2">Come Visit Us At Our Campus</h2>

//       <div className="google-map">
//         <GoogleMapReact
//           bootstrapURLKeys={{key: API_Key }}
//           defaultCenter={location}
//           defaultZoom={zoomLevel}
//         >
//           <LocationPin
//             lat={location.lat}
//             lng={location.lng}
//             text={location.address}
//           />
//         </GoogleMapReact>
//       </div>
//     </div>
//   );
// };

// export default Map;
