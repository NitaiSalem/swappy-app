import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../../../actions/authActions";
import {
  getHomeDetails,
  getProfileImg,
  getHomeImages,
} from "../../../actions/profileDataActions";
// import {getHomeImages} from "../../../actions/profileDataActions";
// import Details from "./details/Details";
import ProfileEdit from "./profile-edit/ProfileEdit";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Map from "../../map/Map";
import HomeMap from "../../map/homeMap";
// import { makeStyles } from "@mui/styles";
// import defaultHomeImage from "../../../../../src/site images/home-default.jpg";

import defaultHomeImage from "../../../../src/site images/home-default.jpg";
import ImageCarousel from "../search-results/found-profile/ImageCarousel";
import { Button, createTheme, Grid } from "@mui/material";
import UserDetails from "../search-results/found-profile/UserDetails";
import UserAmneties from "../search-results/found-profile/UserAmneties";
import MapIcon from "@mui/icons-material/Map";
import Footer from "../footer/Footer";
import HouseRules from "../search-results/found-profile/HouseRules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// import '../../layout/search-results/found-profile/profile.style.scss'

const Profile = () => {
  // const [edit, setEdit] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false); //this is show from examle!
  const profileImg = useSelector((state) => state.profileImg); //use these for rest of state from db
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

  // const toggleEdit = (view) => {
  //   setEdit(view);
  // };
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
          <div
            className={isScrolled ? "scrolled-column" : "user-column"}
            // style={isScrolled ? scrollStyle : defaultStyle}
          >
            <div className="profile-info-container">
              <div className="profile-pic-container">
                <img className="profile-pic" src={profileImg} alt="profile" />
              </div>
              <div className="name-email-container">
                <h2 className="home-title">{user.name}</h2>
                {/* <p> {state.email}</p> */}
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
              {/* <h5 className="">edit profile: </h5> */}
            {/* {edit && <ProfileEdit toggleEdit={toggleEdit} />} */}
            <Link to="edit" className="edit-profile-button">
              <FontAwesomeIcon className="edit-profile-icon"  icon="edit" /> &nbsp; Update profile
            </Link>
            </div>
        
            {/* <Button
            className={classes.button}
            variant="contained"
            href={"mailto:" + state.email}
          >
            Email User
          </Button> */}
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

    // //useffect to fetch image from db?
    // // <div
    // //   style={{ height: "100vh", marginTop: "100px" }}
    // //   className="container valign-wrapper"
    // // >
    //   {/* <button onClick={() => toggleEdit(true)}>
    //     <FontAwesomeIcon icon="edit" />
    //   </button>
    //   <div className="row">
    //     <div className="col s12 center-align">
    //       <h4>
    //         <b>Hey there,</b> {user.name.split(" ")[0]}
    //         <div className="profile-img-container">
    //           <img
    //             src={profileImage}
    //             alt="profile pic"
    //             width="100px"
    //             height="100px"
    //           />
    //         </div>
    //         <p className="flow-text grey-text text-darken-1">
    //           You are logged into a full-stack{" "}
    //           <span style={{fontFamily: "monospace"}}>MERN</span> app 👏
    //         </p>
    //       </h4>
    //       <button
    //         style={{
    //           width: "150px",
    //           borderRadius: "3px",
    //           letterSpacing: "1.5px",
    //           marginTop: "1rem",
    //         }}
    //         onClick={onLogoutClick}
    //         className="btn btn-large waves-effect waves-light hoverable blue accent-3"
    //       >
    //         Logout
    //       </button>
    //       <div className="home-images-container">
    //         <h2>images: </h2>
    //         {Array.isArray(homeImages) &&
    //           homeImages.map((img, i) => {
    //             return (
    //               <div key={i} className="image-container">
    //                 <img
    //                   key={i}
    //                   id={i}
    //                   src={img.url}
    //                   alt="home-pic"
    //                   width="100px"
    //                   height="100px"
    //                 />
    //               </div>
    //             );
    //           })}

    //         {edit && <ProfileEdit toggleEdit={toggleEdit} />}
    //         <div className="about-home-container">
    //           <h3>About my home:</h3>
    //           <p>{homeDetails.aboutHome}</p>
    //         </div>
    //         <Details />
    //         {houseLocation.lat && (
    //           <HomeMap houseLocation={houseLocation} height="300px" zoom={15} />
    //         )}
    //       </div>
    //     </div>
    //   </div> */}
    // // </div>
  );
};

export default Profile;
