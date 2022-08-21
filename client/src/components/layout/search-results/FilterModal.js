import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
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
import {
  AMNETIES_NAMES,
  DETAILS_NAMES,
  filterAll,
  LIFESTYLE_NAMES,
  MENU_ITEMS_RANGE,
} from "../../../utils/filterUtils";
import {
  setFilterCounter,
  updateFilterValues,
} from "../../../actions/filterActions";
import { getSearchResults } from "../../../utils/getHomes";

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
  list: {
    maxHeight: "400px",
  },
}));

const FilterModal = ({
  // setFilteredHomes,
  // searchHomes,
  setCurrPage,
 setPageCount,
  setOffset,
  searchValue,
  setFoundHomes,
  // setCheckedAmnetiesState
}) => {
  const classes = useStyles();
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
  const reduxFilterCount = useSelector((state) => state.filterCounter);
  //!not yet recieving filter count from redux so check is wrong?
  const [filterCount, setFilterCount] = useState(
    reduxFilterCount ? reduxFilterCount : 0
  );
  // console.log("filtercount on top in filtermodal", filterCount);
  const [checkedLifeStyle, setCheckedLifeStyle] = useState(
    previousCheckedLifeStyle
  );
  const [desiredHomeType, setDesiredHomeType] = useState(
    previousDesiredHomeType
  );
  //? maybe these initializations mess upp filter values afterwards?
  const [checkedAmneties, setCheckedAmneties] = useState(
    previousCheckedAmneties
  );

  const [filterDetailsObj, setFilterDetailsObj] = useState(
    previousFilterDetailsObj
  );

  const dispatch = useDispatch();
  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => {
    // console.log("handle close called ");
    setCheckedLifeStyle(previousCheckedLifeStyle);
    setDesiredHomeType(previousDesiredHomeType);
    setCheckedAmneties(previousCheckedAmneties);
    setFilterDetailsObj(previousFilterDetailsObj);
    setFilterCount(reduxFilterCount);
    setIsModalOpen(false);
  };

  const fetchHomes = async () => {
    const foundHomes = await getSearchResults(searchValue);
    setFoundHomes(foundHomes);
  };

  const resetFilter = () => {
    setCurrPage(0); 
     setOffset(0);
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
    fetchHomes();
 

  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const updateResults = async () => {
    // console.log(
    //   "checked amneties in filter modal on update |: ",
    //   checkedAmneties
    // );
    //! error here typo???
    // setFilterCounter(filterCount);
    // console.log("filtercount in update results in filtermodal", filterCount);
    // setCheckedAmnetiesState(checkedAmneties);

    // const fetchedHomes = await getSearchResults(searchValue);
    setPageCount(0);
     setCurrPage(0); 
    setOffset(0);
    dispatch(
      updateFilterValues(
        desiredHomeType,
        filterDetailsObj,
        checkedAmneties,
        checkedLifeStyle
      )
    );
    dispatch(setFilterCounter(filterCount));

    // const foundHomes = await getSearchResults(searchValue);

    // if (filterCount > 0 && foundHomes) {
    //   console.log("filtercount condition applied");
    //   const finalFiltered = filterAll(
    //     foundHomes,
    //     desiredHomeType,
    //     filterDetailsObj,
    //     checkedAmneties,
    //     checkedLifeStyle
    //   );
    //   setFoundHomes(finalFiltered);
    // } else setFoundHomes(foundHomes ? foundHomes : []);

    setIsModalOpen(false);
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
                        checked={
                          desiredHomeType === "Appartment" ? true : false
                        }
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
                        checked={desiredHomeType === "House" ? true : false}
                      />
                    }
                    label={"House"}
                    value="House"
                    labelPlacement="end"
                  />
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
                              checked={
                                checkedAmneties[amnety.key] ? true : false
                              }
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
                              checked={
                                checkedLifeStyle[lifeStyle.key] ? true : false
                              }
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

export default memo(FilterModal);
