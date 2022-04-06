import { useLocation } from "react-router-dom";
import "./found-profile.style.scss";
import ImageCarousel from "./ImageCarousel";
import defaultImage from "../../../../site images/user-icon.png";
import defaultHomeImage from "../../../../../src/site images/home-default.jpg";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@mui/material";

const defaultStyle = {
  boxShadow: "3px 0px 5px 0 rgba(0, 0, 0, 0.2)",
  width: "30%",
  display: "flex",
  padding: "15px",
};

const scrollStyle = {
  position: "fixed",
  top: "40px",
  boxShadow:
    "3px 0px 5px 0 rgba(0, 0, 0, 0.2),-3px 0px 5px 0 rgba(0, 0, 0, 0.2)",
  right: "16px",
  height: "70vh",
  width: "24%",
  display: "flex",
  padding: "15px",
};

const FoundProfile = () => {
  // const [userColumnStyle, setUserColumnStyle] = useState(defaultStyle);
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
  // const {
  //   homeDetails: { houseLocation },
  // } = state;

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
          </div>
          <Button  href={"mailto:" + state.email} variant="contained">
Email User
          </Button>
        </div>
      </div>

      <div className="found-home-info-section-container">
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
        <h1>header for scroll</h1>
      </div>
    </div>
  );
};

export default FoundProfile;
