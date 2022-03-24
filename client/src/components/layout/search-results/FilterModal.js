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
import { useDispatch, useSelector } from "react-redux";
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
  filterAll,
} from "../../../utils/filterUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { setFilterCounter, updateFilterValues } from "../../../actions/filterActions";
import { getSearchResults } from "../../../utils/getHomes";

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
  searchValue,
  filteredHomes,
  perPage,
  setSlicedHomes,
  setFoundHomes,
  setPageCount,
}) => {
  //* const homeDetails = useSelector((state) => state.homeDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(useSelector((state) => state.filterCounter));
  const [checkedLifeStyle, setCheckedLifeStyle] = useState(
    useSelector((state) => state.lifeStyleFilter)
  );
  const [desiredHomeType, setDesiredHomeType] = useState(
    useSelector((state) => state.homeTypeFilter)
  );
  const [checkedAmneties, setCheckedAmneties] = useState(
    useSelector((state) => state.amnetiesFilter)
  );
  const [filterDetailsObj, setFilterDetailsObj] = useState(
    useSelector((state) =>
      state.detailsFilter
        ? state.detailsFilter
        : {
            bathRooms: "",
            bedRooms: "",
            sleeps: "",
            doubleBeds: "",
            singleBeds: "",
          }
    )
  );

  const dispatch = useDispatch();
  console.log({ filterCount });
  console.log({ checkedAmneties });
  console.log({ filteredHomes });
  console.log({ filterDetailsObj });
  console.log({ desiredHomeType });

  ////////////////////////////?add filtercount to show how many filters applied?
  // let navigate = useNavigate();
  // const location = useLocation();

  //const amneties = useSelector(({homeDetails}) => homeDetails.amneties);
  //*can acess location.pathname for current path.

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

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
    if(!(filterDetailsObj[key])&& value !== ""){
      setFilterCount(filterCount + 1);
    }
    else if(value===""){
      setFilterCount(filterCount - 1);
    }
    setFilterDetailsObj({ ...filterDetailsObj, [key]:value });
  };

  const handleAmnetiesChange = (key) => {
if(!(checkedAmneties[key])){
  setFilterCount(filterCount + 1);
}
else  setFilterCount(filterCount - 1);
    
    setCheckedAmneties({
      ...checkedAmneties,
      [key]: checkedAmneties[key] ? false : true,
    });
  };

  const handleLifestyleChange = (key) => {

    if(!(checkedLifeStyle[key])){
      setFilterCount(filterCount + 1);
    }
    else  setFilterCount(filterCount - 1);

    setCheckedLifeStyle({
      ...checkedLifeStyle,
      [key]: checkedLifeStyle[key] ? false : true,
    });
  };

  const updateResults = () => {
    //!dispatch the filter count as well on update! 
    dispatch(setFilterCounter(filterCount)); 
    const finalFiltered = filterAll(
      foundHomes,
      desiredHomeType,
      filterDetailsObj,
      checkedAmneties,
      checkedLifeStyle
    );
    setFilteredHomes(finalFiltered);
    setSlicedHomes(finalFiltered);
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

  const clearFilter = () => {
    setFilterCount(0);
    setFilterDetailsObj({
      bathRooms: "",
      bedRooms: "",
      sleeps: "",
      doubleBeds: "",
      singleBeds: "",
    });
    setCheckedAmneties({});
    setCheckedLifeStyle({});
    setDesiredHomeType("");
    dispatch(
      updateFilterValues(
        "",
        {
          bathRooms: "",
          bedRooms: "",
          sleeps: "",
          doubleBeds: "",
          singleBeds: "",
        },
        {},
        {}
      )
    );

    // let fetchedHomes = await getSearchResults(searchValue);
    // setFilteredHomes(fetchedHomes);
    // setIsModalOpen(false);

    //*set is filter active to false !
  };

  return (
    <div className="modal-container">
      <Button onClick={handleOpen} className="filter-button">
        <FilterListIcon /> Filter Results ({filterCount})
      </Button>
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
                    onChange={handleHomeTypeChange}
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
                    value="Appartment"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    onChange={handleHomeTypeChange}
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
                    value="House"
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
              <div className="apply-or-delete-filter-container">
                <Button size="medium" onClick={updateResults}>
                  Update Results
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={clearFilter}
                >
                  Clear Filter
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
