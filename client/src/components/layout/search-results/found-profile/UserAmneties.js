import {
  LiveTv,
  Wifi,
  Microwave,
  Kitchen,
  AcUnit,
  Fireplace,
  Pool,
  OutdoorGrill,
  Yard,
  LocalParking,
  SportsEsports,
  Balcony,
  Elevator,
  LocalLaundryService,
  Accessible,
} from "@mui/icons-material";
//   import {useSelector} from "react-redux";
 import CheckIcon from "@mui/icons-material/Check";

const UserAmneties = ({ amneties }) => {
  // const amneties = useSelector(({homeDetails}) => homeDetails.amneties);
  // if (!amneties) {
  //   return <p>loading...</p>;
  // }
  //this way with conditional rendering we dont even console.log the empty amneties object, consider this type of condition for
  //rest of api call values? much less renders of whole components and instead displaying a loading indication which is friendlier for user.
  // console.log(amneties, "amneties value after destructuring here");
  return (
    <div className="info-section-box">
      <h5 className= "info-section-title">
        <CheckIcon /> &nbsp; Home amenities
      </h5>
      { amneties&& 
      <div className="user-amneties-wrapper">
        {amneties.tv === true && (
          <div className="user-amnety-box">
            <LiveTv className="icon" />
            <span className="amnety-text">TV </span>
          </div>
        )}

        {amneties.wifi === true && (
          <div className="user-amnety-box">
            <Wifi className="icon" />
            <span className="amnety-text">Wifi</span>
          </div>
        )}

        {amneties.microwave === true && (
          <div className="user-amnety-box">
            <Microwave className="icon" />
            <span className="amnety-text">Microwave </span>
          </div>
        )}

        {amneties.fridge === true && (
          <div className="user-amnety-box">
            <Kitchen className="icon" />
            <span>Fridge</span>
          </div>
        )}

        {amneties.ac === true && (
          <div className="user-amnety-box">
            <AcUnit className="icon" />
            <span>AC</span>
          </div>
        )}

        {amneties.firePlace === true && (
          <div className="user-amnety-box">
            <Fireplace className="icon" />
            <span>Fire place</span>
          </div>
        )}

        {amneties.pool === true && (
          <div className="user-amnety-box">
            <Pool className="icon" />
            <span className="amnety-text">Swimming pool</span>
          </div>
        )}
        {amneties.grill === true && (
          <div className="user-amnety-box">
            <OutdoorGrill className="icon" />
            <span>Outdoor grill</span>
          </div>
        )}

        {amneties.garden === true && (
          <div className="user-amnety-box">
            <Yard className="icon" />
            <span>Garden</span>
          </div>
        )}

        {amneties.parking === true && (
          <div className="user-amnety-box">
            <LocalParking className="icon" />
            <span>Parking</span>
          </div>
        )}

        {amneties.esports === true && (
          <div className="user-amnety-box">
            <SportsEsports className="icon" />
            <span>Esports</span>
          </div>
        )}

        {amneties.balcony === true && (
          <div className="user-amnety-box">
            <Balcony className="icon" />
            <span>Balcony</span>
          </div>
        )}
        {amneties.accessible === true && (
          <div className="user-amnety-box">
            <Accessible className="icon" />
            <span>Accessible</span>
          </div>
        )}

        {amneties.elevator === true && (
          <div className="user-amnety-box">
            <Elevator className="icon" />
            <span>Elevator</span>
          </div>
        )}
        {amneties.washingMachine === true && (
          <div className="user-amnety-box">
            <LocalLaundryService className="icon" />
            <span>Washing machine</span>
          </div>
        )}
      </div>
}
    </div>
  );
};

export default UserAmneties;
