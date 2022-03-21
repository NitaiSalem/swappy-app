
import {SmokingRooms, Pets, LocalFlorist, ChildCare} from "@mui/icons-material";
import { useSelector } from "react-redux";


const HouseRules = () => {
    //here change style/class depending on state, if true then show as normal icon like smokers welcome, if flase then gray with line on it...
    const houseRules = useSelector(({homeDetails}) => homeDetails.houseRules);


    if (!houseRules) {
      return <p>loading...</p>;
    }

  return (
    <div>
      <h2>House rules</h2>

      {houseRules.smoking === true && (
        <div className="detail-box">
          <SmokingRooms />
          <p>Smokers welcome</p>
        </div>
      )}

{houseRules.pets === true && (
        <div className="detail-box">
          <Pets />
          <p>Pets welcome</p>
        </div>
      )}


{houseRules.plants === true && (
        <div className="detail-box">
          <LocalFlorist />
          <p>Plants to water</p>
        </div>
      )}

{houseRules.children === true && (
        <div className="detail-box">
          <ChildCare />
          <p>Children welcome</p>
        </div>
      )}


      <h2>House rules</h2>
      <h2>House rules</h2>
    </div>
  );
};

export default HouseRules; 