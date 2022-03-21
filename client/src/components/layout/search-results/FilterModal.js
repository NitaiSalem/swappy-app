import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Numbers } from "@mui/icons-material";
import {
  filterDetails,
  filterHomeType,
  filterAmneties,
  filterLifeStyle,
} from "../../../utils/filterUtils";
import { useLocation, useNavigate } from "react-router-dom";

//this is to map checkboxes....
export const AMNETIES_NAMES = [
  { name: "TV", key: "tv" },
  { name: "WiFi", key: "wifi" },
  { name: "Microwave", key: "microwave" },
  { name: "Refrigerator", key: "fridge" },
  { name: "AC", key: "ac" },
  { name: "FirePlace", key: "firePlace" },
  { name: "Pool", key: "pool" },
  { name: "Grill", key: "grill" },
  { name: "Garden", key: "garden" },
  { name: "Parking", key: "parking" },
  { name: "Esports", key: "esports" },
  { name: "Balcony", key: "balcony" },
  { name: "Elevator", key: "elevator" },
  { name: "washing Machine", key: "washingMachine" },
  { name: "Accessible", key: "accessible" },
];

export const DETAILS_NAMES = [
  { name: "Bathrooms", key: "bathRooms" },
  { name: "Bedrooms", key: "bedRooms" },
  { name: "Sleeps", key: "sleeps" },
  { name: "Double-beds", key: "doubleBeds" },
  { name: "Single-beds", key: "singleBeds" },
];

export const LIFESTYLE_NAMES = [
  { name: "Smokers welcome", key: "smoking" },
  { name: "Pets welcome", key: "pets" },
  { name: "Children welcome", key: "children" },
];

export const MENU_ITEMS_RANGE = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "3px",
  boxShadow: 24,
  p: 4,
};

const FilterModal = ({
  setFilteredHomes,
  foundHomes,
  perPage,
  setSlicedHomes,
  setFoundHomes,
  setPageCount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedLifeStyle, setCheckedLifeStyle] = useState({});
  const [desiredHomeType, setDesiredHomeType] = useState("");
  const [checkedAmneties, setCheckedAmneties] = useState({});
  const [filterDetailsObj, setFilterDetailsObj] = useState({
    bathRooms: "",
    bedRooms: "",
    sleeps: "",
    doubleBeds: "",
    singleBeds: "",
  });

  console.log({ checkedAmneties });
  console.log({ foundHomes });
  console.log({ filterDetailsObj });
  console.log({ desiredHomeType });

  ////////////////////////////?add filtercount to show how many filters applied?
  let navigate = useNavigate();
  const location = useLocation();
  //*can acess location.pathname for current path.

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleDetailsChange = (event, key) => {
    setFilterDetailsObj({ ...filterDetailsObj, [key]: event.target.value });
  };

  const handleAmnetiesChange = (key) => {
    setCheckedAmneties({
      ...checkedAmneties,
      [key]: checkedAmneties[key] ? false : true,
    });
  };

  const handleLifestyleChange = (key) => {
    setCheckedLifeStyle({
      ...checkedLifeStyle,
      [key]: checkedLifeStyle[key] ? false : true,
    });
  };

  const updateResults = () => {
    //how to filter our details::
    const filterdByHomeType = filterHomeType(desiredHomeType, foundHomes);

    const filteredByDetails = filterDetails(
      filterDetailsObj,
      filterdByHomeType
    );
    const filteredByAmneties = filterAmneties(
      checkedAmneties,
      filteredByDetails
    );

    const finalFiltered = filterLifeStyle(checkedLifeStyle, filteredByAmneties);

    setFilteredHomes(finalFiltered);
    setSlicedHomes(finalFiltered);
    // setPageCount(Math.ceil(filteredHomes.length / perPage))

    // navigate(`${location.pathname}`, {state: {foundHomes: finalFiltered}});
  };

  return (
    <div className="modal-container">
      <Button onClick={handleOpen} className="filter-button">
        <FilterListIcon /> Filter Results
      </Button>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={style}>
            <FormControl component="fieldset" className="checkbox-container">
              <div className="details-title">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Details
                </Typography>
              </div>
              <div className="details-container">
                {/* map here */}
                {DETAILS_NAMES.map((detail) => {
                  return (
                    <div className="detail-container" key={detail.name}>
                      <FormControl
                        fullWidth
                        component="fieldset"
                        className="details-form-container"
                      >
                        <InputLabel id="demo-simple-select-label">
                          {detail.name}
                        </InputLabel>
                        <Select
                          labelId={detail.name}
                          id={detail.name}
                          value={filterDetailsObj[detail.key]}
                          label={detail.name}
                          onChange={(event) =>
                            handleDetailsChange(event, detail.key)
                          }
                        >
                          {/*loop over each menue item for each of our details  */}
                          <MenuItem value={""}>{detail.name} </MenuItem>
                          {MENU_ITEMS_RANGE.map((number) => (
                            <MenuItem key={number} value={number}>
                              {number}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  );
                })}
                <div className="home-type-checkbox-container">
                  <FormControlLabel
                    onChange={() =>
                      setDesiredHomeType(
                        desiredHomeType === "Appartment" ? "" : "Appartment"
                      )
                    }
                    control={
                      <Checkbox
                        checkedIcon={
                          <CheckBoxOutlinedIcon style={{ color: "#e28811" }} />
                        }
                        icon={
                          <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: "#e28811" }}
                          />
                        }
                        // checked={false}
                        checked={
                          desiredHomeType === "Appartment" ? true : false
                        }
                        //make condition here
                      />
                    }
                    label={"Appartment"}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    onChange={() =>
                      setDesiredHomeType(
                        desiredHomeType === "House" ? "" : "House"
                      )
                    }
                    control={
                      <Checkbox
                        checkedIcon={
                          <CheckBoxOutlinedIcon style={{ color: "#e28811" }} />
                        }
                        icon={
                          <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: "#e28811" }}
                          />
                        }
                        // checked={false}
                        checked={desiredHomeType === "House" ? true : false}
                        //make condition here
                      />
                    }
                    label={"House"}
                    labelPlacement="end"
                  />
                  {/* make 2 checkboxes?  */}
                  {/* <Button variant="outlined">house</Button>
                  <Button variant="outlined">Appartment</Button> */}
                </div>
              </div>

              <FormGroup>
                <div className="filter-item-container">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Amneties
                  </Typography>
                  <div className={"amneties-container"}>
                    {AMNETIES_NAMES.map((amnety) => {
                      return (
                        <div
                          className="amnety-label-container"
                          key={amnety.name}
                        >
                          <FormControlLabel
                            onChange={() => handleAmnetiesChange(amnety.key)}
                            control={
                              <Checkbox
                                checkedIcon={
                                  <CheckBoxOutlinedIcon
                                    style={{ color: "#e28811" }}
                                  />
                                }
                                icon={
                                  <CheckBoxOutlineBlankOutlinedIcon
                                    style={{ color: "#e28811" }}
                                  />
                                }
                                // checked={false}
                                checked={
                                  checkedAmneties[amnety.key] ? true : false
                                }
                                //make condition here
                              />
                            }
                            label={amnety.name}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Lifestyle
                  </Typography>
                  <div className="lifestyle-container">
                    {LIFESTYLE_NAMES.map((lifeStyle) => {
                      return (
                        <div
                          className="lifestyle-checkbox-container"
                          key={lifeStyle.name}
                        >
                          <FormControlLabel
                            onChange={() =>
                              handleLifestyleChange(lifeStyle.key)
                            }
                            control={
                              <Checkbox
                                checkedIcon={
                                  <CheckBoxOutlinedIcon
                                    style={{ color: "#e28811" }}
                                  />
                                }
                                icon={
                                  <CheckBoxOutlineBlankOutlinedIcon
                                    style={{ color: "#e28811" }}
                                  />
                                }
                                // checked={false}
                                checked={
                                  checkedLifeStyle[lifeStyle.key] ? true : false
                                }
                                //make condition here
                              />
                            }
                            label={lifeStyle.name}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FormGroup>
              <Button onClick={() => updateResults(checkedAmneties)}>
                Apply Filter
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FilterModal;
