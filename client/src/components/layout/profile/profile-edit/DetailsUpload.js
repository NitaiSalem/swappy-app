// import {
//   RadioGroup,
//   FormControl,
//   FormLabel,
//   FormControlLabel,
//   Radio,
//   Button,
// } from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Bed, SingleBed} from "@mui/icons-material";
import { memo } from "react";

const DetailsUpload = ({
  setHomeType,
  sleeps,
  setSleeps,
  bedRooms,
  setBedRooms,
  singleBeds,
  setSingleBeds,
  doubleBeds,
  setDoubleBeds,
  bathRooms,
  setBathRooms,
}) => {
  //recieve state and increment?
  const handleIncrement = (state) => {
    if (state < 20) {
      return state + 1;
    } else return state;
  };

  const handleDecrement = (state) => {
    if (state > 1) return state - 1;
    else return state;
  };
console.log("details upload render")
  return (
    <div className="details-upload-container">
      {/*add 2 icons here */}
      <h2>upload home details</h2>
      <button onClick={() => setHomeType("Appartment")}>
        <FontAwesomeIcon icon="building" />
      </button>
      <button onClick={() => setHomeType("House")}>
        <FontAwesomeIcon icon="home" />
      </button>
      <div className="sleeps-container">
        <h3>How many People does your place fit? </h3>
        <FontAwesomeIcon icon="user-friends" />

        <button value="-" onClick={() => setSleeps(handleDecrement(sleeps))}>
          -
        </button>
        <p>{sleeps}</p>
        <button onClick={() => setSleeps(handleIncrement(sleeps))}>+</button>
        <h3>How many bedrooms are there? </h3>

        <FontAwesomeIcon icon="door-open" />
        <button onClick={() => setBedRooms(handleDecrement(bedRooms))}>
          -
        </button>
        <p>{bedRooms}</p>
        <button onClick={() => setBedRooms(handleIncrement(bedRooms))}>
          +
        </button>
        <h3>How many Single beds are there? </h3>
        {/* <FontAwesomeIcon icon="bed" /> */}
        <SingleBed />
        <button onClick={() => setSingleBeds(handleDecrement(singleBeds))}>
          -
        </button>
        <p>{singleBeds}</p>
        <button onClick={() => setSingleBeds(handleIncrement(singleBeds))}>
          +
        </button>

        <h3>How many Double beds are there? </h3>
        {/* <FontAwesomeIcon icon="bed" /> */}
        <Bed />
        <button onClick={() => setDoubleBeds(handleDecrement(doubleBeds))}>
          -
        </button>
        <p>{doubleBeds}</p>
        <button onClick={() => setDoubleBeds(handleIncrement(doubleBeds))}>
          +
        </button>

        <h3>How many bathrooms are in your home? </h3>
        <FontAwesomeIcon icon="bath" />
        <button onClick={() => setBathRooms(handleDecrement(bathRooms))}>
          -
        </button>
        <p>{bathRooms}</p>
        <button onClick={() => setBathRooms(handleIncrement(bathRooms))}>
          +
        </button>
      </div>
    </div>
  );
};

export default memo(DetailsUpload);

