import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import blueMarker from "../../../../client/src/assets/marker-icon.png";
import redMarker from "../../../../client/src/assets/red-marker.png";
import defaultHomeImage from "../../../src/assets/home-default.jpg";
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
    url: redMarker,
    scaledSize: new window.google.maps.Size(37, 37),
  };
  const highlightedIcon = {
    url: blueMarker,
    scaledSize: new window.google.maps.Size(54, 54),
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
                    onCloseClick={onInfoWindowClose}
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
            </div>
          );
        })}
    </div>
  );
};

export default MarkerComponent;
