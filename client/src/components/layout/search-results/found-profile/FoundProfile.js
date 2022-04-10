import { useLocation } from "react-router-dom";
import "./found-profile.style.scss";
import ImageCarousel from "./ImageCarousel";
import defaultImage from "../../../../site images/user-icon.png";
import defaultHomeImage from "../../../../../src/site images/home-default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { Bed, SingleBed } from "@mui/icons-material";
import GroupIcon from '@mui/icons-material/Group';
import { useEffect, useState, useRef, useCallback } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WcIcon from "@mui/icons-material/Wc";
import CheckIcon from "@mui/icons-material/Check";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RuleIcon from "@mui/icons-material/Rule";
import MapIcon from "@mui/icons-material/Map";
// import {
// CheckIcon
// } from "@mui/icons-material";

const defaultStyle = {
  boxShadow: "3px 0px 5px 0 rgba(0, 0, 0, 0.2)",
  width: "30%",
  display: "flex",
  padding: "15px",
};

const scrollStyle = {
  // zIndex: "0 !important",
  position: "absolute",
  zIndex: "3",
  // position: "fixed",
  top: "40px",
  boxShadow:
    "3px 0px 5px 0 rgba(0, 0, 0, 0.2),-3px 0px 5px 0 rgba(0, 0, 0, 0.2)",
  right: "16px",
  height: "70vh",
  width: "20%",
  display: "flex",
  padding: "15px",
};

const useStyles = makeStyles({
  root: {},
  table: {},
  button: {
    backgroundColor: "rgb(32, 78, 204) !important",
    position: "static !important",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(96, 133, 235) !important",
      color: "#fff",
    },
  },

  nameCell: {
    whiteSpace: "nowrap",
  },
});

const FoundProfile = () => {
  const classes = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerWrapper = useRef(null);

  const onScroll = useCallback((event) => {
    // console.log("onscroll method fired")
    if (event.target.scrollTop > 25) {
      setIsScrolled(true);
    } else if (event.target.scrollTop < 25) {
      setIsScrolled(false);
    }
  }, []);

  const { state } = useLocation();

  const houseLocation = state.homeDetails?.houseLocation
    ? state.homeDetails.houseLocation
    : {};

  const [isCarouselOpen, setIsCarouselOpen] = useState(false); //this is show from examle!

  console.log("this is state ", state);

  useEffect(() => {
    // clean up code
    scrollContainerWrapper.current.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollContainerWrapper}
      className="found-profile-container"
      style={{ overflowY: isCarouselOpen ? "hidden" : "auto" }}
    >
      <div className="top-view-container">
        <div className="found-home-img-container">
          <img
            onClick={
              state.homeImages.length > 0 ? () => setIsCarouselOpen(true) : null
            }
            className="found-profile-homeimg"
            src={
              state.homeImages.length > 0
                ? state.homeImages[0].url
                : defaultHomeImage
            }
            alt="homeimg"
          />
        </div>

        <div className={"carousel-wrapper-outside"}>
          <ImageCarousel
            isCarouselOpen={isCarouselOpen}
            setIsCarouselOpen={setIsCarouselOpen}
            homeImages={state.homeImages}
          />
        </div>
        {!isCarouselOpen && (
          <div
            className="user-column"
            style={isScrolled ? scrollStyle : defaultStyle}
          >
            {/* <h2 className="home-title">
            {state.name}`s Home in {houseLocation.area}
          </h2> */}
            <div className="profile-info-container">
              <div className="profile-pic-container">
                <img
                  className="profile-pic"
                  src={state.profileImg ? state.profileImg : defaultImage}
                  alt="profile"
                />
              </div>
              <div className="name-email-container">
                <h2 className="home-title">{state.name}</h2>
                <p> {state.email}</p>
              </div>
            </div>

            <div className="hometype-area-container">
              <h2 className="hometype-area">
                {state.homeDetails?.homeType
                  ? state.homeDetails.homeType + " in "
                  : "Appartment/House in unset location"}{" "}
                {houseLocation?.area}
              </h2>
            </div>

            <div className="about-home-section">
              <h5 className="about-home-title">About our home: </h5>
              <p className="about-home-text">
                {" "}
                {state.homeDetails?.aboutHome
                  ? state.homeDetails.aboutHome
                  : "The user have not described their home "}
              </p>
            </div>
            <div className="contact-section">
              <h5 className="cotact-title">Contact: </h5>
              <p>
                {" "}
                Send {state.name} a swap suggestion. you could suggest precise
                or flexible dates, supply the number of guests and add a
                personal note{" "}
              </p>
            </div>
            <Button
              className={classes.button}
              variant="contained"
              href={"mailto:" + state.email}
            >
              Email User
            </Button>
          </div>
        )}
      </div>

      <div className="found-home-info-section-container">
        <Grid container className="grid-container">
          <Grid item xs={6} md={6} className="my-grid-column">
            <div className="info-section-box">
              <h5>
                <AssignmentTurnedInIcon /> Details
              </h5>
              <ul className="details-list">
                <li>
                  <div className="icon-and-detail"> 
                    <MapsHomeWorkIcon className="icon" /> Home type
                  </div><span> 2</span>
                </li>
                <li>
                <div className="icon-and-detail">
                  <GroupIcon className="icon"/> Sleeps </div><span> 2</span>
                </li>
                <li>
                <div className="icon-and-detail">
                  <SingleBed className="icon" /> Single beds </div><span> 2</span>
                </li>
                <li>
                <div className="icon-and-detail">
                  <Bed  className="icon"/>  Double beds </div><span> 2</span>
                </li>
                <li>
                <div className="icon-and-detail">
                  <MeetingRoomIcon className="icon"/>   Bedrooms </div><span> 2</span>
                </li>

                <li>
                <div className="icon-and-detail">
                  <WcIcon className="icon" />   Bathrooms </div><span> 2</span>
                </li>
              </ul>
            </div>

            <div className="info-section-box">
              <h5>
                <RuleIcon /> House rules
              </h5>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
            </div>
          </Grid>
          <Grid item xs={6} md={6} className="my-grid-column">
            <div className="info-section-box">
              <h5>
                {" "}
                <CheckIcon /> Home amenities
              </h5>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
            </div>

            <div className="info-section-box">
              <h5>
                <MapIcon /> Location
              </h5>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
              <h1>header for scroll</h1>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FoundProfile;
