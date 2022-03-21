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
import {useSelector} from "react-redux";

const Amneties = () => {
  const amneties = useSelector(({homeDetails}) => homeDetails.amneties);
  if (!amneties) {
    return <p>loading...</p>;
  }
  //this way with conditional rendering we dont even console.log the empty amneties object, consider this type of condition for
  //rest of api call values? much less renders of whole components and instead displaying a loading indication which is friendlier for user.
  console.log(amneties, "amneties value after destructuring here");
  return (
    <div>
      {amneties.tv === true && (
        <div className="detail-box">
          <LiveTv />
          <p>TV </p>
        </div>
      )}

      {amneties.wifi && (
        <div className="detail-box">
          <Wifi />
          <p>Wifi</p>
        </div>
      )}

      {amneties.microwave && (
        <div className="detail-box">
          <Microwave />
          <p>Microwave</p>
        </div>
      )}

      {amneties.fridge && (
        <div className="detail-box">
          <Kitchen />
          <p>Fridge</p>
        </div>
      )}

      {amneties.ac && (
        <div className="detail-box">
          <AcUnit />
          <p>AC</p>
        </div>
      )}

      {amneties.firePlace && (
        <div className="detail-box">
          <Fireplace />
          <p>Fire place</p>
        </div>
      )}

      {amneties.pool && (
        <div className="detail-box">
          <Pool />
          <p>Swimming pool</p>
        </div>
      )}
      {amneties.grill && (
        <div className="detail-box">
          <OutdoorGrill />
          <p>Outdoor grill</p>
        </div>
      )}

      {amneties.garden && (
        <div className="detail-box">
          <Yard />
          <p>Garden</p>
        </div>
      )}

      {amneties.parking && (
        <div className="detail-box">
          <LocalParking />
          <p>Parking</p>
        </div>
      )}

      {amneties.esports && (
        <div className="detail-box">
          <SportsEsports />
          <p>Esports</p>
        </div>
      )}

      {amneties.balcony && (
        <div className="detail-box">
          <Balcony />
          <p>Balcony</p>
        </div>
      )}
      {amneties.accessible && (
        <div className="detail-box">
          <Accessible />
          <p>Accessible</p>
        </div>
      )}

      {amneties.elevator && (
        <div className="detail-box">
          <Elevator />
          <p>Elevator</p>
        </div>
      )}
      {amneties.washingMachine && (
        <div className="detail-box">
          <LocalLaundryService />
          <p>Washing machine</p>
        </div>
      )}
      <h2> hello</h2>
      <h2> hello</h2>
      <h2> hello</h2>
    </div>
  );
};

export default Amneties;
