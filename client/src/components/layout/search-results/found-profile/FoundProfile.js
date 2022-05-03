import { useLocation } from "react-router-dom";
import "./found-profile.style.scss";
import ImageCarousel from "./ImageCarousel";
import defaultImage from "../../../../site images/user-icon.png";
import defaultHomeImage from "../../../../../src/site images/home-default.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import {
  Bed,
  SingleBed,
  SmokingRooms,
  Pets,
  LocalFlorist,
  ChildCare,
} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button, createTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WcIcon from "@mui/icons-material/Wc";
import CheckIcon from "@mui/icons-material/Check";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RuleIcon from "@mui/icons-material/Rule";
import MapIcon from "@mui/icons-material/Map";
import UserAmneties from "./UserAmneties";
import HomeMap from "../../../map/homeMap";
import Footer from "../../footer/Footer";

const useStyles = makeStyles({
  root: {},
  table: {},
  button: {
    width: "70%",
    margin: "auto !important",
    color: " #fff !important",
    backgroundColor: "#f7a800 !important",
    borderColor: "#f7a800 !important",
    position: "static",

    "@media (max-width: 1024px)": {
      width: "140px",
    },

    "&:hover": {
      backgroundColor: "rgb(182, 119, 2) !important",
      color: "#fff !important",
    },
  },

  nameCell: {
    whiteSpace: "nowrap",
  },
});

const FoundProfile = () => {
  const classes = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);
  // const scrollContainerWrapper = useRef(null);

  const onScroll = useCallback((event) => {
    // console.log("onscroll method fired")
    console.log("onscroll method fired");
    console.log("this is event target scrolltop", event.target);
    //window.scrollY > 0
    /*

    if (event.target.scrollTop > 25) {
      setIsScrolled(true);
    } else if (event.target.scrollTop < 25) {
      setIsScrolled(false);
    }
  }, []);
*/

    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else if (window.scrollY === 0) {
      setIsScrolled(false);
    }
  }, []);

  const { state } = useLocation();

  const houseLocation = state.homeDetails?.houseLocation
    ? state.homeDetails.houseLocation
    : {};

  const homeDetails = state.homeDetails ? state.homeDetails : "";
  const homeAmneties = state.homeDetails?.amneties
    ? state.homeDetails.amneties
    : "";

  const [isCarouselOpen, setIsCarouselOpen] = useState(false); //this is show from examle!

  console.log("this is state ", state);

  useEffect(() => {
    // clean up code
    // scrollContainerWrapper.current.addEventListener
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      // ref={scrollContainerWrapper}
      className="found-profile-container"

      // style={{ overflowY: isCarouselOpen ? "hidden" : "auto" }}
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
            className={isScrolled ? "scrolled-column" : "user-column"}
            // style={isScrolled ? scrollStyle : defaultStyle}
          >
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
          <Grid item xs={12} md={6} className="my-grid-column">
            <div className="info-section-box">
              <h5>
                <AssignmentTurnedInIcon /> Details
              </h5>
              <ul className="details-list">
                <li>
                  <div className="icon-and-detail">
                    <MapsHomeWorkIcon className="icon" /> Home type
                  </div>
                  <span> {state.homeDetails?.homeType}</span>
                </li>
                <li>
                  <div className="icon-and-detail">
                    <GroupIcon className="icon" /> Sleeps{" "}
                  </div>
                  <span>{homeDetails?.sleeps}</span>
                </li>
                <li>
                  <div className="icon-and-detail">
                    <SingleBed className="icon" /> Single beds{" "}
                  </div>
                  <span> {homeDetails?.singleBeds}</span>
                </li>
                <li>
                  <div className="icon-and-detail">
                    <Bed className="icon" /> Double beds{" "}
                  </div>
                  <span> {homeDetails?.doubleBeds}</span>
                </li>
                <li>
                  <div className="icon-and-detail">
                    <MeetingRoomIcon className="icon" /> Bedrooms{" "}
                  </div>
                  <span> {homeDetails?.bedRooms}</span>
                </li>

                <li>
                  <div className="icon-and-detail">
                    <WcIcon className="icon" /> Bathrooms{" "}
                  </div>
                  <span> {homeDetails?.bathRooms}</span>
                </li>
              </ul>
            </div>

            <div className="info-section-box">
              <h5>
                <RuleIcon /> House rules
              </h5>
              {/*  string.charAt(0).toUpperCase() + string.slice(1); */}

              <ul className="details-list">
                {homeDetails.houseRules?.smoking === true && (
                  <li>
                    <div className="icon-and-detail">
                      <SmokingRooms className="icon" />
                      <span> Smokers welcome</span>
                    </div>
                  </li>
                )}

                {homeDetails.houseRules?.pets === true && (
                  <li>
                    <div className="icon-and-detail">
                      <Pets className="icon" /> <span>Pets welcome </span>
                    </div>
                  </li>
                )}

                {homeDetails.houseRules?.plants === true && (
                  <li>
                    <div className="icon-and-detail">
                      <LocalFlorist className="icon" />
                      <span> Plants to water </span>
                    </div>
                  </li>
                )}

                {homeDetails.houseRules?.children === true && (
                  <li>
                    <div className="icon-and-detail">
                      <ChildCare className="icon" />
                      <span>Children welcome</span>
                    </div>
                  </li>
                )}
              </ul>

              {/* {homeDetails&& Object.keys(homeDetails.houseRules).map((key,i)=> {
  return(
<div key={i}>
  {homeDetails.houseRules[key]&&  <p>{key.charAt(0).toUpperCase() + key.slice(1)} </p>}
   </div>

  )
})} */}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="my-grid-column">
            <div className="info-section-box">
              <h5>
                {" "}
                <CheckIcon /> Home amenities
              </h5>

              <UserAmneties amneties={homeAmneties} />
            </div>

            <div className="info-section-box">
              <h5>
                <MapIcon /> Location
              </h5>
              {!isCarouselOpen && (
                <HomeMap
                  houseLocation={houseLocation}
                  height="400px"
                  zoom={15}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default FoundProfile;
