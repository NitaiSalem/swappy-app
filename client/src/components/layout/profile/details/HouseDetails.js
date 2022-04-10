import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Bed, SingleBed} from "@mui/icons-material";
import {useSelector} from "react-redux";


const HouseDetails = () => {
  const homeDetails = useSelector((state) => state.homeDetails);

if(!homeDetails.homeType){
    return(
        <p>Loading...</p>
    )
}

  console.log(homeDetails, "home-details in housedetails comp on render. ")
 // console.log(homeDetails.amneties.wifi, " acess to wifi var here???")
  return (
    <div>
      <h3>Your home</h3>
      <div className="details-container">
        {homeDetails.homeType === "House" && (
          <div className="detail-box">
            <FontAwesomeIcon icon="home" />
            <p>House</p>
          </div>
        )}
        {homeDetails.homeType === "Appartment" && (
          <div className="detail-box">
            <FontAwesomeIcon icon="building" />
            <p>Appartment</p>
          </div>
        )}

        <div className="detail-box">
          <FontAwesomeIcon icon="user-friends" />
          <p>
            Sleeps <span>{homeDetails.sleeps}</span>
          </p>
        </div>

        <div className="detail-box">
          <FontAwesomeIcon icon="door-open" />
          <p>
            <span>{homeDetails.bedRooms}</span> Bedrooms
          </p>
        </div>

        <div className="detail-box">
          <SingleBed />
          <p>
            <span>{homeDetails.singleBeds}</span> single beds
          </p>
        </div>

        <div className="detail-box">
          <Bed />
          <p>
            <span>{homeDetails.doubleBeds}</span> double beds
          </p>
        </div>


{/*!add bathroom  */ }

      </div>
      <h2>h2</h2>
    </div>
  );
};

export default HouseDetails;
