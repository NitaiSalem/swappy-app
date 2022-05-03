
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
  
  const UserAmneties = ({amneties}) => {
    // const amneties = useSelector(({homeDetails}) => homeDetails.amneties);
    // if (!amneties) {
    //   return <p>loading...</p>;
    // }
    //this way with conditional rendering we dont even console.log the empty amneties object, consider this type of condition for
    //rest of api call values? much less renders of whole components and instead displaying a loading indication which is friendlier for user.
    console.log(amneties, "amneties value after destructuring here");
    return (
      <div className="user-amneties-wrapper">
        {amneties.tv === true && (
          <div className="user-amnety-box">
            <LiveTv className="icon"/>
            <span className="amnety-text" >TV </span>
          </div>
        )}
  
        {amneties.wifi && (
          <div className="user-amnety-box">
            <Wifi className="icon"/>
            <span className="amnety-text">Wifi</span>
          </div>
        )}
  
        {amneties.microwave && (
          <div className="user-amnety-box">
            <Microwave className="icon"/>
            <span className="amnety-text">Microwave </span>
          </div>
        )}
  
        {amneties.fridge && (
          <div className="user-amnety-box">
            <Kitchen className="icon"/>
            <span>Fridge</span>
          </div>
        )}
  
        {amneties.ac && (
          <div className="user-amnety-box">
            <AcUnit className="icon"/>
            <span>AC</span>
          </div>
        )}
  
        {amneties.firePlace && (
          <div className="user-amnety-box">
            <Fireplace className="icon"/>
            <span>Fire place</span>
          </div>
        )}
  
        {amneties.pool && (
          <div className="user-amnety-box">
            <Pool className="icon"/>
            <span className="amnety-text">Swimming pool</span>
          </div>
        )}
        {amneties.grill && (
          <div className="user-amnety-box">
            <OutdoorGrill className="icon"/>
            <span>Outdoor grill</span>
          </div>
        )}
  
        {amneties.garden && (
          <div className="user-amnety-box">
            <Yard className="icon"/>
            <span>Garden</span>
          </div>
        )}
  
        {amneties.parking && (
          <div className="user-amnety-box">
            <LocalParking className="icon"/>
            <span>Parking</span>
          </div>
        )}
  
        {amneties.esports && (
          <div className="user-amnety-box">
            <SportsEsports className="icon"/>
            <span>Esports</span>
          </div>
        )}
  
        {amneties.balcony && (
          <div className="user-amnety-box">
            <Balcony className="icon"/>
            <span>Balcony</span>
          </div>
        )}
        {amneties.accessible && (
          <div className="user-amnety-box">
            <Accessible className="icon"/>
            <span>Accessible</span>
          </div>
        )}
  
        {amneties.elevator && (
          <div className="user-amnety-box">
            <Elevator className="icon"/>
            <span>Elevator</span>
          </div>
        )}
        {amneties.washingMachine && (
          <div className="user-amnety-box">
            <LocalLaundryService className="icon"/>
            <span>Washing machine</span>
          </div>
        )}
      </div>
    );
  };
  
  export default UserAmneties;
  