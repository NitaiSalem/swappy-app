import {
  SmokingRooms,
  Pets,
  LocalFlorist,
  ChildCare,
} from "@mui/icons-material";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HouseRulesUpload = ({
  houseRules,
  setHouseRules,
  setInViewComponent,
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    inView && setInViewComponent("house-rules-upload");
  }, [inView]);

  const updateHouseRules = (rule) => {
    houseRules[rule]
      ? setHouseRules({ ...houseRules, [rule]: false })
      : setHouseRules({ ...houseRules, [rule]: true });
  };

  return (
    <div className="panel" id="house-rules-upload" ref={ref}>
      <div className="panel-heading-container">
        <h3>Lifestyle</h3>
      </div>
      <div className="panel-body">
        <div className="rules-container">
          <div className="input-option">
            <input
              name="smoking"
              id="smoking"
              type="checkbox"
              checked={houseRules.smoking === true}
              onChange={() => updateHouseRules("smoking")}
              className="hidden-input"
            />
            <label htmlFor ="smoking">
              <SmokingRooms /> Smokers welcome
            </label>
          </div>

          <div className="input-option">
            <input
              name="pets"
              id="pets"
              type="checkbox"
              checked={houseRules.pets === true}
              onChange={() => updateHouseRules("pets")}
              className="hidden-input"
            />
            <label htmlFor ="pets">
              <Pets /> Pets welcome
            </label>
          </div>

          <div className="input-option">
            <input
              name="plants"
              id="plants"
              type="checkbox"
              checked={houseRules.plants === true}
              onChange={() => updateHouseRules("plants")}
              className="hidden-input"
            />
            <label htmlFor ="plants">
              <LocalFlorist /> Plants to water
            </label>
          </div>

          <div className="input-option">
            <input
              name="children"
              id="children"
              type="checkbox"
              checked={houseRules.children === true}
              onChange={() => updateHouseRules("children")}
              className="hidden-input"
            />
            <label htmlFor ="children">
              <ChildCare /> Children welcome
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HouseRulesUpload);
