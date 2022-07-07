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
import { makeStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import { Numbers } from "@mui/icons-material";
import {
  AMNETIES_NAMES,
  DETAILS_NAMES,
  filterAll,
  LIFESTYLE_NAMES,
  MENU_ITEMS_RANGE,
} from "../../../utils/filterUtils";
// import { useLocation, useNavigate } from "react-router-dom";
import {
  setFilterCounter,
  updateFilterValues,
} from "../../../actions/filterActions";
import { getSearchResults } from "../../../utils/getHomes";
// import { getSearchResults } from "../../../utils/getHomes";

//this is to map checkboxes....

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "15px 26px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "84vh",
  maxWidth: "90vw",
  bgcolor: "background.paper",
  borderRadius: "3px",
  boxShadow: 24,
};

const useStyles = makeStyles((theme) => ({
  // root: {
  // },
  list: {
    maxHeight: "400px",
    // padding: 0
  },
}));



const FilterModal = ({
  setFilteredHomes,
  foundHomes,
  searchValue,
  filteredHomes,
  perPage,
  setSlicedHomes,
  setFoundHomes,
  setPageCount,
}) => {
  const classes = useStyles();
  //* const homeDetails = useSelector((state) => state.homeDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previousCheckedAmneties = useSelector((state) => state.amnetiesFilter);
  const previousCheckedLifeStyle = useSelector(
    (state) => state.lifeStyleFilter
  );
  const previousDesiredHomeType = useSelector((state) => state.homeTypeFilter);
  const previousFilterDetailsObj = useSelector((state) =>
    state.detailsFilter
      ? state.detailsFilter
      : {
          bathRooms: "",
          bedRooms: "",
          sleeps: "",
          doubleBeds: "",
          singleBeds: "",
        }
  );
  const [filterCount, setFilterCount] = useState(
    useSelector((state) => (state.filterCounter ? state.filterCounter : 0))
  );
  // const displayCount = useSelector((state) =>
  //   state.filterCounter ? state.filterCounter : 0
  // );

  const [checkedLifeStyle, setCheckedLifeStyle] = useState(
    previousCheckedLifeStyle
  );
  const [desiredHomeType, setDesiredHomeType] = useState(
    previousDesiredHomeType
  );

  const [checkedAmneties, setCheckedAmneties] = useState(
    previousCheckedAmneties
  );
  //attempt defining local state correctly depending on global redux state
  // const [checkedAmneties, setCheckedAmneties] = useState(
  //   Object.values(previousCheckedAmneties).some(Boolean)
  //     ? previousCheckedAmneties
  //     : {}
  // );

  const [filterDetailsObj, setFilterDetailsObj] = useState(
    previousFilterDetailsObj
  );

  const dispatch = useDispatch();
  // console.log({ filterCount });
  // console.log({ checkedAmneties });
  // console.log({ filteredHomes });
  // console.log({ filterDetailsObj });
  // console.log({ desiredHomeType });
  ////////////////////////////?add filtercount to show how many filters applied?
  // let navigate = useNavigate();
  // const location = useLocation();
  //*can acess location.pathname for current path.

  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => {
    //!set the filter states  here back to what they are in redux state
    setCheckedLifeStyle(previousCheckedLifeStyle);
    setDesiredHomeType(previousDesiredHomeType);
    setCheckedAmneties(previousCheckedAmneties);
    setFilterDetailsObj(previousFilterDetailsObj);

    setIsModalOpen(false);
  };
  const resetFilter = () => {
    dispatch(updateFilterValues("", {}, {}, {}));
    dispatch(setFilterCounter(0));
    setDesiredHomeType("");
    setFilterDetailsObj({
      bathRooms: "",
      bedRooms: "",
      sleeps: "",
      doubleBeds: "",
      singleBeds: "",
    });
    setCheckedAmneties({});
    setCheckedLifeStyle({});

    setFilterCount(0);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const updateResults = async() => {
    //!update results not updating with search value in consideration!
    setFilterCounter(filterCount);
    dispatch(setFilterCounter(filterCount));
    
//make the api call then apply all the new filters? 
const foundHomes = await getSearchResults(searchValue);

    if (filterCount > 0 && foundHomes) {
      const finalFiltered = filterAll(
        foundHomes,
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      );
      setFilteredHomes(finalFiltered);
    } else setFilteredHomes(foundHomes? foundHomes: []);

    // const finalFiltered = filterAll(
    //   foundHomes,
    //   desiredHomeType,
    //   filterDetailsObj,
    //   checkedAmneties,
    //   checkedLifeStyle
    // );
    // setFilteredHomes(finalFiltered);
    // setSlicedHomes(finalFiltered);

    setIsModalOpen(false);
    dispatch(
      updateFilterValues(
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      )
    );
  };

  const handleHomeTypeChange = ({ target: { value } }) => {
    if (!desiredHomeType) {
      setFilterCount(filterCount + 1);
    } else if (value === desiredHomeType) {
      setFilterCount(filterCount - 1);
    }
    setDesiredHomeType(desiredHomeType === value ? "" : value);
  };

  const handleDetailsChange = ({ target: { value } }, key) => {
    //cover cases:
    //if that key is true/defined then count stays the same
    //if its empty then +1
    //must -1 when canceled? check the value from event
    if (!filterDetailsObj[key] && value !== "") {
      setFilterCount(filterCount + 1);
    } else if (value === "") {
      setFilterCount(filterCount - 1);
    }
    setFilterDetailsObj({ ...filterDetailsObj, [key]: value });
  };

  const handleAmnetiesChange = (key) => {
    if (!checkedAmneties[key]) {
      setFilterCount(filterCount + 1);
    } else setFilterCount(filterCount - 1);
    setCheckedAmneties({
      ...checkedAmneties,
      [key]: checkedAmneties[key] ? false : true,
    });
  };

  const handleLifestyleChange = (key) => {
    if (!checkedLifeStyle[key]) {
      setFilterCount(filterCount + 1);
    } else setFilterCount(filterCount - 1);
    setCheckedLifeStyle({
      ...checkedLifeStyle,
      [key]: checkedLifeStyle[key] ? false : true,
    });
  };

  return (
    <div className="modal-container">
      <Button
        onClick={handleOpen}
        className={filterCount > 0 ? "filter-button-active" : "filter-button"}
      >
        <FilterListIcon /> Add filters ({filterCount})
      </Button>
      <button onClick={resetFilter} className="reset-filters">
        Reset filters
      </button>
      <style>
        {/* {`.fooDiv {
                background-color: red;
                color: white;
                font-size: 2em
            }`} */}
      </style>
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
          <Box sx={style} className="filter-box-container">
            <FormControl component="fieldset" className="checkbox-container">
              <div className="details-title">
                <Typography
                  style={{ fontWeight: "700" }}
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
                          MenuProps={{ classes: { list: classes.list } }}
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
                    onChange={handleHomeTypeChange}
                    control={
                      <Checkbox
                        checkedIcon={
                          <CheckBoxOutlinedIcon style={{ color: "#f7a800" }} />
                        }
                        icon={
                          <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: "#f7a800" }}
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
                    value="Appartment"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    onChange={handleHomeTypeChange}
                    control={
                      <Checkbox
                        checkedIcon={
                          <CheckBoxOutlinedIcon style={{ color: "#f7a800" }} />
                        }
                        icon={
                          <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: "#f7a800" }}
                          />
                        }
                        // checked={false}
                        checked={desiredHomeType === "House" ? true : false}
                        //make condition here
                      />
                    }
                    label={"House"}
                    value="House"
                    labelPlacement="end"
                  />
                  {/* make 2 checkboxes?  */}
                  {/* <Button variant="outlined">house</Button>
                  <Button variant="outlined">Appartment</Button> */}
                </div>
              </div>

              <FormGroup>
                <div className="details-title">
                  <Typography
                    style={{ fontWeight: "700" }}
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Amneties
                  </Typography>
                </div>
                <div className="amneties-container">
                  {AMNETIES_NAMES.map((amnety) => {
                    return (
                      <div className="amnety-label-container" key={amnety.name}>
                        <FormControlLabel
                          onChange={() => handleAmnetiesChange(amnety.key)}
                          control={
                            <Checkbox
                              checkedIcon={
                                <CheckBoxOutlinedIcon
                                  style={{ color: "#f7a800" }}
                                />
                              }
                              icon={
                                <CheckBoxOutlineBlankOutlinedIcon
                                  style={{ color: "#f7a800" }}
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

                <div className="details-title">
                  <Typography
                    style={{ fontWeight: "700" }}
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Lifestyle
                  </Typography>
                </div>
                <div className="lifestyle-container">
                  {LIFESTYLE_NAMES.map((lifeStyle) => {
                    return (
                      <div
                        className="lifestyle-checkbox-container"
                        key={lifeStyle.name}
                      >
                        <FormControlLabel
                          onChange={() => handleLifestyleChange(lifeStyle.key)}
                          control={
                            <Checkbox
                              checkedIcon={
                                <CheckBoxOutlinedIcon
                                  style={{ color: "#f7a800" }}
                                />
                              }
                              icon={
                                <CheckBoxOutlineBlankOutlinedIcon
                                  style={{ color: "#f7a800" }}
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
              </FormGroup>
              <div
                className="apply-or-delete-filter-container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <Button
                  style={{ color: "#e85710", borderColor: "#e85710" }}
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{ color: "#068295", borderColor: "#068295" }}
                  variant="outlined"
                  size="medium"
                  onClick={updateResults}
                >
                  Update Results
                </Button>
              </div>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FilterModal;
