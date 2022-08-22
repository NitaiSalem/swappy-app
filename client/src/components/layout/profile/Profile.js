import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomeDetails,
  getProfileImg,
  getHomeImages,
} from "../../../actions/profileDataActions";
import defaultHomeImage from "../../../../src/assets/home-default.jpg";
import ImageCarousel from "../search-results/found-profile/ImageCarousel";
import { Grid } from "@mui/material";
import UserDetails from "../search-results/found-profile/UserDetails";
import UserAmneties from "../search-results/found-profile/UserAmneties";
import MapIcon from "@mui/icons-material/Map";
import Footer from "../footer/Footer";
import HouseRules from "../search-results/found-profile/HouseRules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/user-icon.png";
import UserMap from "../../map/UserMap";

const Profile = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const profileImg = useSelector((state) => state.profileImg);
  const user = useSelector((state) => state.auth.user);
  const homeImages = useSelector((state) => state.homeImages);
  const homeDetails = useSelector((state) => state.homeDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else if (window.scrollY === 0) {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getProfileImg());
    dispatch(getHomeImages());
    dispatch(getHomeDetails());
  }, []);

  const lat = homeDetails.houseLocation
    ? homeDetails.houseLocation.lat
    : 32.077860051007875;
  const lng = homeDetails.houseLocation
    ? homeDetails.houseLocation.lng
    : 34.77854258203124;

  const houseLocation = {
    lat: lat,
    lng: lng,
  };

  return (
    <div className="found-profile-container">
      <div className="top-view-container">
        <div className="found-home-img-container">
          <img
            onClick={
              homeImages.length > 0 ? () => setIsCarouselOpen(true) : null
            }
            className="found-profile-homeimg"
            src={homeImages.length > 0 ? homeImages[0].url : defaultHomeImage}
            alt="homeimg"
          />
        </div>

        <div className={"carousel-wrapper-outside"}>
          <ImageCarousel
            isCarouselOpen={isCarouselOpen}
            setIsCarouselOpen={setIsCarouselOpen}
            homeImages={homeImages}
          />
        </div>
        {!isCarouselOpen && (
          <div className={isScrolled ? "scrolled-column" : "user-column"}>
            <div className="profile-info-container">
              <div className="profile-pic-container">
                <img
                  className="profile-pic"
                  src={profileImg ? profileImg : defaultImage}
                  alt="profile"
                />
              </div>
              <div className="name-email-container">
                <h2 className="home-title">{user.name}</h2>
              </div>
            </div>
            <div className="hometype-area-container">
              <h2 className="hometype-area">
                {homeDetails.homeType
                  ? homeDetails.homeType +
                    " in " +
                    homeDetails.houseLocation.area
                  : "Appartment/House in unset location"}
              </h2>
            </div>
            <div className="about-home-section">
              <h5 className="about-home-title">About our home: </h5>
              <p className="about-home-text">
                {" "}
                {homeDetails?.aboutHome
                  ? homeDetails.aboutHome
                  : "you have not described their home "}
              </p>
            </div>
            <div className="Update-profile-container">
              <Link to="edit" className="edit-profile-button">
                <FontAwesomeIcon className="edit-profile-icon" icon="edit" />{" "}
                &nbsp; Update profile
              </Link>
            </div>
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
            <UserAmneties amneties={homeDetails.amneties} />

            <div className="info-section-box">
              <h5 className="info-section-title">
                <MapIcon /> &nbsp; Location
              </h5>
              {!isCarouselOpen && <UserMap houseLocation={houseLocation} />}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
