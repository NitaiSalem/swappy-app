// import {
//   RadioGroup,
//   FormControl,
//   FormLabel,
//   FormControlLabel,
//   Radio,
//   Button,
// } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bed, SingleBed } from "@mui/icons-material";
import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const DetailsUpload = ({ details, setDetails, setInViewComponent }) => {
  //recieve state and increment?
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
    if (state > 1) return state - 1;
    else return state;
  };

  useEffect(() => {
    //  console.log( "this is in view",inView)
    inView && setInViewComponent("details-upload");
  }, [inView]);

  return (
    <div id="details-upload" className="details-upload-container" ref={ref}>
      {/*add 2 icons here */}
      <h2>upload home details</h2>
      <button type="button"
        onClick={() => setDetails({ ...details, homeType: "Appartment" })}
      >
        <FontAwesomeIcon icon="building" />
      </button>
      <button type="button" onClick={() => setDetails({ ...details, homeType: "House" })}>
        <FontAwesomeIcon icon="home" />
      </button>
      <div className="sleeps-container">
        <h3>How many People does your place fit? </h3>
        <FontAwesomeIcon icon="user-friends" />

        <button
        type="button"
          value="-"
          onClick={() =>
            setDetails({ ...details, sleeps: handleDecrement(details.sleeps) })
          }
        >
          -
        </button>
        <p>{details.sleeps}</p>
        <button
        type="button"
          onClick={() =>
            setDetails({ ...details, sleeps: handleIncrement(details.sleeps) })
          }
        >
          +
        </button>
        <h3>How many bedrooms are there? </h3>

        <FontAwesomeIcon icon="door-open" />
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              bedRooms: handleDecrement(details.bedRooms),
            })
          }
        >
          -
        </button>
        <p>{details.bedRooms}</p>
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              bedRooms: handleIncrement(details.bedRooms),
            })
          }
        >
          +
        </button>
        <h3>How many Single beds are there? </h3>
        {/* <FontAwesomeIcon icon="bed" /> */}
        <SingleBed />
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              singleBeds: handleDecrement(details.singleBeds),
            })
          }
        >
          -
        </button>
        <p>{details.singleBeds}</p>
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              singleBeds: handleIncrement(details.singleBeds),
            })
          }
        >
          +
        </button>

        <h3>How many Double beds are there? </h3>
        {/* <FontAwesomeIcon icon="bed" /> */}
        <Bed />
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              doubleBeds: handleDecrement(details.doubleBeds),
            })
          }
        >
          -
        </button>
        <p>{details.doubleBeds}</p>
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              doubleBeds: handleIncrement(details.doubleBeds),
            })
          }
        >
          +
        </button>

        <h3>How many bathrooms are in your home? </h3>
        <FontAwesomeIcon icon="bath" />
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              bathRooms: handleDecrement(details.bathRooms),
            })
          }
        >
          -
        </button>
        <p>{details.bathRooms}</p>
        <button
        type="button"
          onClick={() =>
            setDetails({
              ...details,
              bathRooms: handleIncrement(details.bathRooms),
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default memo(DetailsUpload);
