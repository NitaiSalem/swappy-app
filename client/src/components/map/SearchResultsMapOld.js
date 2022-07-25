import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle,
  InfoWindow,
} from "react-google-maps";
// import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {memo} from "react";
// import {useNavigate} from "react-router-dom";
// import mapIcon from "../../../../client/src/site images/marker-icon.png";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkerComponent from "./Marker";

const API_Key = process.env.REACT_APP_MAPS_API_KEY;
Geocode.setApiKey(API_Key);
Geocode.enableDebug();

const SearchResultsMap = ({mappedHouses, goToUser}) => {
  //   const [markerIcon, setMarkerIcon] = useState("");
  // const mappedHouses =
  //   filteredHomes.length > 0
  //     ? filteredHomes.filter((home) => home.homeDetails)
  //     : [];
  //   const navigate = useNavigate();
  const zoom = 11;
  let markerPosition = {
    lat: 32.077860051007875,
    lng: 34.77854258203124,
  };

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
          {/* create hover scale change with background change for marker  */}

          <MarkerComponent mappedHouses={mappedHouses} goToUser={goToUser} />

          {/* <Marker
            // className="marker-class-here"
            onClick={onMarkerClick}
            draggable={true}
            // onDragEnd={onMarkerDragEnd}
            position={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
          /> */}
          {/* <Marker /> */}
        </GoogleMap>
      );
    })
  );

  //   const onMarkerDragEnd = useCallback((event) => {
  //     console.log("event", event);
  //     let newLat = event.latLng.lat(),
  //       newLng = event.latLng.lng();
  //     Geocode.fromLatLng(newLat, newLng).then(
  //       (response) => {
  //         console.log(response, "this is the response from geocode onmarkerdrag");
  //         let updatedAddress = response.results[0].formatted_address,
  //           addressArray = response.results[0].address_components;
  //         // const area = getArea(addressArray);
  //         // console.log(area, " area in onmarkerdragend");
  //         props.setHouseLocation({
  //           lat: newLat,
  //           lng: newLng,
  //           //   address: updatedAddress ? updatedAddress : "",
  //           //   area: area ? area : "",
  //           //add city here?
  //         }); //this causing double render!
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }, []);

  return (
    <div className="map-wrapper">
      {/* <Autocomplete
        options={{
          types: [["address"], ["cities"]],
          componentRestrictions: {country: "isr"},
        }}
        style={{
          width: "100%",
          height: "40px",
          paddingLeft: "16px",
          marginTop: "2px",
        }}
        onPlaceSelected={onPlaceSelected}
      /> */}
      {/* <div className="form-group">
        <label htmlFor="">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          readOnly="readOnly"
          //   value={address}
        />
      </div> */}
      {/* check googlemapurl for options in api call */}
      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_Key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={
          <div style={{height: "100%", width: "100%", paddingBottom: "40px"}} />
        }
        mapElement={<div style={{height: `100%`}} />}
        zoom={zoom}
      />
    </div>
  );
};

export default memo(SearchResultsMap);
