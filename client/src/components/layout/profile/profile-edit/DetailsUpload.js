import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Bed, SingleBed } from "@mui/icons-material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const DetailsUpload = ({ details, setDetails, setInViewComponent }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  const handleIncrement = (state) => {
    if (state < 20) {
      return state + 1;
    } else return state;
  };

  const handleDecrement = (state) => {
    if (state >= 1) return state - 1;
    else return state;
  };

  useEffect(() => {
    inView && setInViewComponent("details-upload");
  }, [inView]);

  return (
    <div id="details-upload" className="panel" ref={ref}>
      <div className="panel-heading-container">
        <h3>Details</h3>
      </div>
      <div className="panel-body">
        <h3 className="panel-body-title"> Home type</h3>
        <div className="home-type-container">
          <div className="input-option">
            <input
              name="home-type-appatrment"
              id="home-type-appartment"
              type="checkbox"
              checked={details.homeType === "Appartment"}
              onChange={() =>
                setDetails({ ...details, homeType: "Appartment" })
              }
              className="hidden-input"
            />
            <label htmlFor="home-type-appartment">
              <FontAwesomeIcon icon="building" style={{ fontSize: "28px" }} />{" "}
              Apartment
            </label>
          </div>
          <div className="input-option">
            <input
              name="home-type-house"
              id="home-type-house"
              checked={details.homeType === "House"}
              className="hidden-input"
              type="checkbox"
              onChange={() => setDetails({ ...details, homeType: "House" })}
            />
            <label htmlFor="home-type-house">
              <FontAwesomeIcon icon="home" style={{ fontSize: "28px" }} /> House
            </label>
          </div>
        </div>
        <h3 className="panel-body-title">
          <FontAwesomeIcon icon="user-friends" /> Sleeps: &nbsp;
          <span>{details.sleeps}</span>
        </h3>
        <div className="sleeps-container">
          <div className="beds-rooms-container">
            <div className="input-number-container">
              <SingleBed fontSize="inherit" />
              <p className="input-text">Single beds </p>
              <button
                disabled={details.singleBeds === 0}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    singleBeds: handleDecrement(details.singleBeds),
                    sleeps:
                      details.sleeps > 0 && details.singleBeds > 0
                        ? details.sleeps - 1
                        : details.sleeps,
                  })
                }
              >
                <RemoveIcon fontSize="inherit" />
              </button>
              <p>{details.singleBeds}</p>
              <button
                disabled={details.singleBeds === 20}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    singleBeds: handleIncrement(details.singleBeds),
                    sleeps: details.sleeps + 1,
                  })
                }
              >
                <AddIcon fontSize="inherit" />
              </button>
            </div>
            <div className="input-number-container">
              <Bed fontSize="inherit" />
              <p className="input-text"> Double beds </p>
              <button
                disabled={details.doubleBeds === 0}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    doubleBeds: handleDecrement(details.doubleBeds),
                    sleeps:
                      details.sleeps > 1 && details.doubleBeds >= 1
                        ? details.sleeps - 2
                        : details.sleeps,
                  })
                }
              >
                <RemoveIcon fontSize="inherit" />
              </button>
              <p>{details.doubleBeds}</p>
              <button
                disabled={details.doubleBeds === 20}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    doubleBeds: handleIncrement(details.doubleBeds),
                    sleeps: details.sleeps + 2,
                  })
                }
              >
                <AddIcon fontSize="inherit" />
              </button>
            </div>
          </div>

          <div className="beds-rooms-container">
            <div className="input-number-container">
              <MeetingRoomIcon fontSize="inherit" />
              <p className="input-text">Bedrooms</p>

              <button
                disabled={details.bedRooms === 0}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    bedRooms: handleDecrement(details.bedRooms),
                  })
                }
              >
                <RemoveIcon fontSize="inherit" />
              </button>
              <p>{details.bedRooms}</p>
              <button
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    bedRooms: handleIncrement(details.bedRooms),
                  })
                }
              >
                <AddIcon fontSize="inherit" />
              </button>
            </div>
            <div className="input-number-container">
              <FontAwesomeIcon icon="bath" style={{ fontSize: "36px" }} />
              <p className="input-text"> Bathrooms </p>
              <button
                disabled={details.bathRooms === 0}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    bathRooms: handleDecrement(details.bathRooms),
                  })
                }
              >
                <RemoveIcon fontSize="inherit" />
              </button>
              <p>{details.bathRooms}</p>
              <button
                disabled={details.bathRooms === 20}
                className="number-button"
                type="button"
                onClick={() =>
                  setDetails({
                    ...details,
                    bathRooms: handleIncrement(details.bathRooms),
                  })
                }
              >
                <AddIcon fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsUpload);
