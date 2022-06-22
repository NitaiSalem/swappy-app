import { useLocation } from "react-router-dom";
import "./profile.style.scss";
import ImageCarousel from "./ImageCarousel";
import defaultImage from "../../../../assets/user-icon.png";
import defaultHomeImage from "../../../../../src/assets/home-default.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

// import GroupIcon from "@mui/icons-material/Group";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button, createTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import WcIcon from "@mui/icons-material/Wc";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MapIcon from "@mui/icons-material/Map";
import UserAmneties from "./UserAmneties";
import HomeMap from "../../../map/homeMap";
import Footer from "../../footer/Footer";
import UserDetails from "./UserDetails";
import HouseRules from "./HouseRules";

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
  const [isCarouselOpen, setIsCarouselOpen] = useState(false); //this is show from examle!
  // const scrollContainerWrapper = useRef(null);

  const onScroll = useCallback((event) => {
    // console.log("onscroll method fired")
    // console.log("onscroll method fired");
    // console.log("this is event target scrolltop", event.target);
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
  const profileImg = state.profileImg ? state.profileImg : defaultImage;
  const homeDetails = state.homeDetails ? state.homeDetails : "";
  const homeAmneties = state.homeDetails?.amneties
    ? state.homeDetails.amneties
    : "";

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
    <div className="found-profile-container">
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
                <img className="profile-pic" src={profileImg} alt="profile" />
              </div>
              <div className="name-email-container">
                <h2 className="home-title">{state.name}</h2>
                <p> {state.email}</p>
              </div>
            </div>

            <div className="hometype-area-container">
              <h2 className="hometype-area">
              {state.homeDetails?.homeType ? state.homeDetails.homeType + " in " + homeDetails.houseLocation.area: "Appartment/House in unset location"}
{/*               
                {state.homeDetails?.homeType
                  ? state.homeDetails.homeType + " in "
                  : "Appartment/House in unset location"}{" "}
                {houseLocation?.area} */}
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
              <h5 className="contact-title">Contact: </h5>
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
            <UserDetails homeDetails={homeDetails} />
            <HouseRules houseRules={homeDetails.houseRules} />
          </Grid>
          <Grid item xs={12} md={6} className="my-grid-column">
            <UserAmneties amneties={homeAmneties} />

            <div className="info-section-box">
              <h5 className= "info-section-title">
                <MapIcon /> &nbsp;  Location
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
