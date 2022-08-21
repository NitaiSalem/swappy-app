import { InfoWindow, Marker } from "@react-google-maps/api";
// import Autocomplete from "react-google-autocomplete";
// import Geocode from "react-geocode";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
// import {memo} from "react";
// import {useNavigate} from "react-router-dom";
import blueMarker from "../../../../client/src/assets/marker-icon.png";
import redMarker from "../../../../client/src/assets/red-marker.png";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import defaultHomeImage from "../../../src/assets/home-default.jpg";
// import defaultHomeImage from "../../../src/site images/home-default.jpg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import defaultImage from "../../../src/assets/user-icon.png";

const MarkerComponent = ({ mappedHouses, goToUser }) => {
  const [markerIcon, setMarkerIcon] = useState("");
  const [infoWindow, setInfoWindow] = useState("");

  const toggleInfoWindow = (id) => {
    setMarkerIcon(id);
    setInfoWindow(id);
  };

  const onInfoWindowClose = () => {
    setInfoWindow("");
    setMarkerIcon("");
  };

  const defaultIcon = {
    url: redMarker, // url
    scaledSize: new window.google.maps.Size(37, 37), // scaled size
  };
  const highlightedIcon = {
    url: blueMarker, // url
    scaledSize: new window.google.maps.Size(60, 60), // scaled size
  };

  return (
    <div>
      {mappedHouses.length > 0 &&
        mappedHouses.map((home, index) => {
          const { houseLocation } = home.homeDetails;
          return (
            <div key={index} className="marker-container">
              <Marker
                icon={
                  markerIcon === home["_id"] ? highlightedIcon : defaultIcon
                }
                key={index}
                // className="marker"
                position={{ lat: houseLocation.lat, lng: houseLocation.lng }}
                onMouseOver={() => setMarkerIcon(home["_id"])}
                onMouseOut={() => infoWindow === "" && setMarkerIcon("")}
                onClick={() => toggleInfoWindow(home["_id"])}
                home={home}
                index={index}
              >
                {infoWindow === home["_id"] && (
                  <InfoWindow
                    style={{ overflow: "hidden" }}
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
                          className="user-image"
                          src={home.profileImg ? home.profileImg : defaultImage}
                          alt="profile pic"
                        ></img>
                      </div>
                      <div className="home-info">
                        <h5 className="user-home-text"> {home.name}'s home </h5>
                        {home.homeDetails.sleeps && (
                          <p className="sleeps-text">
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
