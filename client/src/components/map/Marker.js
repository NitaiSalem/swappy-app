import "./map.scss";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useCallback, useEffect, useState} from "react";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import mapIcon from "../../../../client/src/assets/marker-icon.png";
import redMarker from "../../../../client/src/assets/red-marker.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import defaultHomeImage from "../../../src/assets/home-default.jpg";
// import defaultHomeImage from "../../../src/site images/home-default.jpg";
import defaultImage from "../../../src/assets/user-icon.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// import defaultImage from "../../../site images/user-icon.png";
const MarkerComponent = ({home, index, mappedHouses, goToUser}) => {
  const [markerIcon, setMarkerIcon] = useState("");
  const [infoWindow, setInfoWindow] = useState("");
  console.log(" rendered infowindow", {infoWindow});
  const navigate = useNavigate();

  //   useEffect(() => {}, [markerIcon]);

  //   const onMarkerClick = (id) => {
  //     // const zoom = 13;
  //     // let markerPosition = {
  //     //   lat: 32.077860051007875,
  //     //   lng: 34.77854258203124,
  //     // };

  //     console.log(id + "marker clicked");
  //     navigate(`user/${id}`);
  //   };

  const changeMarker = (id) => {
    setMarkerIcon(id);
  };

  const toggleInfoWindow = (id) => {
    console.log({infoWindow});
    setMarkerIcon(id);
    setInfoWindow(id);
  };

  const onInfoWindowClose = () => {
    console.log({infoWindow});
    setInfoWindow("");
    setMarkerIcon("");
  };

  const defaultIcon = {
    url: redMarker, // url
    scaledSize: new window.google.maps.Size(37, 37), // scaled size
    // anchor: new window.google.maps.Point(17, 46),
  };
  const highlightedIcon = {
    url: mapIcon, // url
    scaledSize: new window.google.maps.Size(60, 60), // scaled size
    // anchor: new window.google.maps.Point(17, 46),
  };

  return (
    <div>
      {mappedHouses.map((home, index) => {
        const {houseLocation} = home.homeDetails;
        console.log({houseLocation});
        return (
          <div key={index} className="marker-container">
            <Marker
              //   style={{color: "green"}}
              icon={markerIcon !== home["_id"] ? defaultIcon : highlightedIcon}
              key={index}
              className="marker"
              position={home.homeDetails.houseLocation}
              onMouseOver={() =>
                infoWindow === "" ? changeMarker(home["_id"]) : ""
              }
              onMouseOut={() => (infoWindow === "" ? setMarkerIcon("") : "")}
              onClick={() => toggleInfoWindow(home["_id"])}
              home={home}
              index={index}
              // onClick={() => toggleInfoWindow(home["_id"])}

              // onClick={() => onMarkerClick(home["_id"])}
              //   onMouseOver={changeBackground}
            >
              {infoWindow === home["_id"] && (
                <InfoWindow
                  style={{overflow: "hidden"}}
                  //   className="info-window"
                  onCloseClick={onInfoWindowClose}
                  //   marker={this.state.activeMarker}
                  // onClose={this.onInfoWindowClose}
                  //   visible={infoWindow !== home["_id"] ? false : true}
                  //   visible={false}
                >
                  <div
                    className="home-info-container"
                    onClick={() => goToUser(home)}
                  >
                  
                    <div
                      className="user-images-container"
                      style={{
                        height: "85%",
                        width: "100%",
                        backgroundImage: home.homeImages[0]
                          ? `url(${home.homeImages[0].url})`
                          : `url(${defaultHomeImage})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                      className ="user-image"
                        src={home.profileImg ? home.profileImg : defaultImage}
                        alt="profile pic"
                     
                      ></img>
                    </div>
                    <div className="home-info" > 
                    <h5 className="user-home-text" > {home.name}'s home  </h5>
                    {home.homeDetails.sleeps && (
                      <p className= "sleeps-text">
                        <PersonOutlineIcon fontSize="small" />
                        {home.homeDetails.sleeps}
                      </p>
                    )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>

            {/* <MarkerComponent home={home} index={index} /> */}
          </div>
        );
      })}

      {/* <Circle
                  // draggable={false}
                  defaultCenter={{
                    lat: houseLocation.lat,
                    lng: houseLocation.lng,
                  }}
                  radius={100}
                /> */}

      {/* <InfoWindow
                  //   marker={this.state.activeMarker}
                  // onClose={this.onInfoWindowClose}
                  visible={true}
                >
                  <div>
                    <p>this is info window</p>
                  </div>
                </InfoWindow> */}
      {/* <Circle /> */}
    </div>
  );
};

export default MarkerComponent;
