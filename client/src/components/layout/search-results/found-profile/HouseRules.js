import {
  SmokingRooms,
  Pets,
  LocalFlorist,
  ChildCare,
} from "@mui/icons-material";
import RuleIcon from "@mui/icons-material/Rule";

const HouseRules = ({ houseRules }) => {
  return (
    <div className="info-section-box">
      <h5 className="info-section-title">
        <RuleIcon /> &nbsp; House rules
      </h5>
      {houseRules && (
        <ul className="details-list">
          {houseRules.smoking === true && (
            <li>
              <div className="icon-and-detail">
                <SmokingRooms className="icon" />
                <span> Smokers welcome</span>
              </div>
            </li>
          )}

          {houseRules.pets === true && (
            <li>
              <div className="icon-and-detail">
                <Pets className="icon" /> <span>Pets welcome </span>
              </div>
            </li>
          )}

          {houseRules.plants === true && (
            <li>
              <div className="icon-and-detail">
                <LocalFlorist className="icon" />
                <span> Plants to water </span>
              </div>
            </li>
          )}

          {houseRules.children === true && (
            <li>
              <div className="icon-and-detail">
                <ChildCare className="icon" />
                <span>Children welcome</span>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default HouseRules;
