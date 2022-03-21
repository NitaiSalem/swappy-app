import {SmokingRooms, Pets, LocalFlorist, ChildCare} from "@mui/icons-material";
import { memo } from "react";

const HouseRulesUpload = ({houseRules, setHouseRules}) => {
  console.log("house rules rendered")
  return (
    <div className="house-rules-upload-container">
      <h2>Lifestyle</h2>

      <button
        onClick={() =>
          setHouseRules(
            houseRules.smoking
              ? {...houseRules, smoking: false}
              : {...houseRules, smoking: true}
          )
        }
        style={{display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <SmokingRooms />
        <span>Smokers welcome</span>
      </button>

      <button
        onClick={() =>
          setHouseRules(
            houseRules.pets
              ? {...houseRules, pets: false}
              : {...houseRules, pets: true}
          )
        }
      >
        <Pets />
        <span>Pets welcome</span>
      </button>

      <button
        onClick={() =>
          setHouseRules(
            houseRules.plants
              ? {...houseRules, plants: false}
              : {...houseRules, plants: true}
          )
        }
      >
        <LocalFlorist />
        <span>plants to water</span>
      </button>

      <button
        onClick={() =>
          setHouseRules(
            houseRules.children
              ? {...houseRules, children: false}
              : {...houseRules, children: true}
          )
        }
      >
        <ChildCare />
        <span>Children welcome</span>
      </button>
    </div>
  );
};

export default memo(HouseRulesUpload);
