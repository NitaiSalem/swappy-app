//make as a component that renders when you click edit profile from inside profile comp.
import { useSelector, useDispatch } from "react-redux";
import DetailsUpload from "./DetailsUpload";
import AmnetiesUpload from "./AmnetiesUpload";
import HouseRulesUpload from "./HouseRulesUpload";
import HomeImgUpload from "./HomeImgUpload";
import ProfileImgUpload from "./ProfileImgUpload";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import {
  getHomeDetails,
  uploadHomeDetails,
  uploadHomeImages,
  uploadProfileImage,
} from "../../../../actions/profileDataActions";
// import Map from "../../../map/Map";
import "./profile-edit.style.scss";
import { useNavigate } from "react-router-dom";
import ProfileEditMap from "../../../map/ProfileEditMap";
// import NewMap2 from "../../../map/NewMap2";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const homeDetails = useSelector((state) => state.homeDetails);
  const currentAmneties = homeDetails.amneties ? homeDetails.amneties : {};
  const currentHouseRules = homeDetails.houseRules
    ? homeDetails.houseRules
    : {};
  const [selectedImage, setSelectedImage] = useState("");
  const [homeImages, setHomeImages] = useState([]);

  //?should probably define these to state from the useselector if possible?
  const [details, setDetails] = useState({
    homeType: homeDetails.homeType ? homeDetails.homeType : "",
    sleeps: homeDetails.sleeps ? homeDetails.sleeps : 1,
    bedRooms: homeDetails.bedRooms ? homeDetails.bedRooms : 0,
    singleBeds: homeDetails.singleBeds ? homeDetails.singleBeds : 1,
    doubleBeds: homeDetails.doubleBeds ? homeDetails.doubleBeds : 0,
    bathRooms: homeDetails.bathRooms ? homeDetails.bathRooms : 0,
    aboutHome: homeDetails.aboutHome ? homeDetails.aboutHome : "",
  });
  const [amneties, setAmneties] = useState(
    Object.keys(currentAmneties).length !== 0 ? currentAmneties : {}
  );
  const [houseRules, setHouseRules] = useState(
    Object.keys(currentHouseRules).length !== 0 ? currentHouseRules : {}
  );
  const [inViewComponent, setInViewComponent] = useState(
    "profile-image-upload"
  );
  const userName = useSelector(({ auth }) => auth.user.name);

  const lat = homeDetails.houseLocation
    ? homeDetails.houseLocation.lat
    : 32.077860051007875;
  const lng = homeDetails.houseLocation
    ? homeDetails.houseLocation.lng
    : 34.77854258203124;

  const [houseLocation, setHouseLocation] = useState({
    lat: lat,
    lng: lng,
    address: homeDetails.houseLocation?.address,
    area: homeDetails.houseLocation?.area,
  });

  useEffect(() => {
    dispatch(getHomeDetails());
  }, []);

  const onSubmit = async (e) => {
    console.log("entered onSubmit method");
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    const profileImg = new FormData();
    profileImg.append("profileImg", selectedImage);
    const homeImgData = new FormData();
    const objOfImages = { ...homeImages };

    for (const key of Object.keys(objOfImages)) {
      console.log({ key });
      homeImgData.append("homeImages", objOfImages[key]);
    }

    console.log({ homeImages });
    console.log({ homeImgData });
    const homeDetails = {
      //* use all these from object state
      homeType: details.homeType,
      sleeps: details.sleeps,
      bedRooms: details.bedRooms,
      singleBeds: details.singleBeds,
      doubleBeds: details.doubleBeds,
      bathRooms: details.bathRooms,
      aboutHome: details.aboutHome,
      amneties: amneties,
      houseRules: houseRules,
      houseLocation: houseLocation,
    };
    selectedImage && dispatch(uploadProfileImage(profileImg));
    console.log("length of homeimages state in profileedit", homeImages.length);
    homeImages.length > 0 && dispatch(uploadHomeImages(homeImgData));
    dispatch(uploadHomeDetails(homeDetails));
    navigate("/Profile");
  };
  return (
    <div className="profile-edit-container">
      <form onSubmit={onSubmit}>
        <Grid container className="grid-container-edit">
          <Grid item md={2} lg={3} className="nav-grid-column">
            <div className="nav-links-container">
              <a
                href="#profile-image-upload"
                className={
                  inViewComponent === "profile-image-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                Profile/about
              </a>
              <a
                href="#home-images-upload"
                className={
                  inViewComponent === "home-images-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                photos
              </a>

              <a
                href="#location-upload"
                className={
                  inViewComponent === "location-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                Location
              </a>
              <a
                href="#details-upload"
                className={
                  inViewComponent === "details-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                Details
              </a>
              <a
                href="#amneties-upload"
                className={
                  inViewComponent === "amneties-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                Amneties
              </a>
              <a
                href="#house-rules-upload"
                className={
                  inViewComponent === "house-rules-upload"
                    ? "active-nav-link"
                    : "nav-link-regular"
                }
              >
                Lifestyle
              </a>
            </div>
          </Grid>

          <Grid
            item
            md={10}
            lg={9}
            sm={12}
            xs={12}
            className="home-edit-grid-column"
          >
            <h1 className="name-title">{userName}'s house</h1>
            <ProfileImgUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setInViewComponent={setInViewComponent}
              details={details}
              setDetails={setDetails}
            />

            <HomeImgUpload
              homeImages={homeImages}
              setHomeImages={setHomeImages}
              setInViewComponent={setInViewComponent}
            />
            <ProfileEditMap
              setInViewComponent={setInViewComponent}
                  houseLocation={
                houseLocation.lat
                  ? houseLocation
                  : { lat: 32.079918405524154, lng: 34.77430033010254 }
              }
              setHouseLocation={setHouseLocation}
          
            />
            {/* <Map
              setInViewComponent={setInViewComponent}
              setHouseLocation={setHouseLocation}
              houseLocation={
                houseLocation.lat
                  ? houseLocation
                  : { lat: 32.079918405524154, lng: 34.77430033010254 }
              }
              height="250px"
              zoom={13}
            /> */}
            <DetailsUpload
              setInViewComponent={setInViewComponent}
              details={details}
              setDetails={setDetails}
            />
            <AmnetiesUpload
              amneties={amneties}
              setAmneties={setAmneties}
              setInViewComponent={setInViewComponent}
            />
            <HouseRulesUpload
              setInViewComponent={setInViewComponent}
              houseRules={houseRules}
              setHouseRules={setHouseRules}
            />
          </Grid>
        </Grid>
        <div className="submit-button-container">
          <button className="submit-button" type="submit">
            Submit!
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
