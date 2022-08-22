import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../../../../utils/getHomes";

const DestinationBox = ({ cityname, imageUrl, searchValue }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const searchResults = await getSearchResults(searchValue);
    navigate(`/search/${searchValue}`, {
      state: { searchValue, foundHomes: searchResults },
    });
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={4}
      className="grid-item-destinations"
      key={cityname}
    >
      <div className="destination-name-container" onClick={handleClick}>
        <h3 className="destination-name">{cityname}</h3>{" "}
      </div>

      <img src={imageUrl} alt="destination" className="destination-image" />
    </Grid>
  );
};

export default DestinationBox;
