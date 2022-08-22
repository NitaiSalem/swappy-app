import { memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MarkerComponent from "./Marker";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const SearchResultsMap = ({ mappedHouses, goToUser }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 32.077860051007875, lng: 34.77854258203124 }}
      zoom={10}
      style={{ marginBottom: "40px"}}
    >
      <MarkerComponent mappedHouses={mappedHouses} goToUser={goToUser} />
    </GoogleMap>
  );
};

export default memo(SearchResultsMap);
