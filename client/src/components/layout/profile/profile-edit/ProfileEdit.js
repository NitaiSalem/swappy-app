//make as a component that renders when you click edit profile from inside profile comp.
import { useSelector, useDispatch } from "react-redux";
import DetailsUpload from "./DetailsUpload";
import AmnetiesUpload from "./AmnetiesUpload";
import HouseRulesUpload from "./HouseRulesUpload";
import HomeImgUpload from "./HomeImgUpload";
import ProfileImgUpload from "./ProfileImgUpload";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import {
  getHomeDetails,
  uploadHomeDetails,
  uploadProfileImage,
} from "../../../../actions/profileDataActions";
import Map from "../../../map/Map";
import "./profile-edit.style.scss";

const ProfileEdit = ({ toggleEdit }) => {
  const [selectedImage, setSelectedImage] = useState();
  //! pass al states to one object maybe?

  const [homeType, setHomeType] = useState("");
  const [sleeps, setSleeps] = useState(1);
  const [bedRooms, setBedRooms] = useState(1);
  const [singleBeds, setSingleBeds] = useState(1);
  const [doubleBeds, setDoubleBeds] = useState(1);
  const [bathRooms, setBathRooms] = useState(1);
  const [amneties, setAmneties] = useState({});
  const [houseRules, setHouseRules] = useState({});
  const [inViewComponent, setInViewComponent] = useState(
    "profile-image-upload"
  );

  const homeDetails = useSelector((state) => state.homeDetails);
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
  const [aboutHome, setAboutHome] = useState(
    homeDetails.aboutHome ? homeDetails.aboutHome : ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeDetails());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    //!all uploads here but images
    // const formData = new FormData();
    const profileImg = new FormData();
    // const homeImg = new FormData();
    profileImg.append("profileImg", selectedImage);

    const homeDetails = {
      homeType: homeType,
      sleeps: sleeps,
      bedRooms: bedRooms,
      singleBeds: singleBeds,
      doubleBeds: doubleBeds,
      bathRooms: bathRooms,
      amneties: amneties,
      houseRules: houseRules,
      houseLocation: houseLocation,
      aboutHome: aboutHome,
    };
    dispatch(uploadProfileImage(profileImg));
    dispatch(uploadHomeDetails(homeDetails));
  };
  //add map here, pass it
  return (
    <div className="profile-edit-container">
      <form onSubmit={onSubmit}>
        <Grid container className="grid-container-edit">
          <Grid item md={4} className="nav-grid-column">
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

          <Grid item md={8} className="home-edit-grid-column">
            <div className="profile-about-container">
              <div className="panel-heading">
                <h3 id="profile-image-upload">Upload Profile Image</h3>
              </div>
              <div className="panel-body">
                <ProfileImgUpload
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  setInViewComponent={setInViewComponent}
                />
                <h3>What will your guests love about your home</h3>
                <TextField
                  style={{ width: "100%" }}
                  value={aboutHome}
                  onChange={(e) => setAboutHome(e.target.value)}
                  label="My Home..."
                  multiline
                  rows={4}
                />
              </div>
            </div>
            <HomeImgUpload setInViewComponent={setInViewComponent} />
            <Map
              setInViewComponent={setInViewComponent}
              setHouseLocation={setHouseLocation}
              houseLocation={
                houseLocation.lat
                  ? houseLocation
                  : { lat: 32.079918405524154, lng: 34.77430033010254 }
              }
              height="300px"
              zoom={13}
            />
            <DetailsUpload
              setInViewComponent={setInViewComponent}
              setHomeType={setHomeType}
              sleeps={sleeps}
              setSleeps={setSleeps}
              bedRooms={bedRooms}
              setBedRooms={setBedRooms}
              singleBeds={singleBeds}
              setSingleBeds={setSingleBeds}
              doubleBeds={doubleBeds}
              setDoubleBeds={setDoubleBeds}
              bathRooms={bathRooms}
              setBathRooms={setBathRooms}
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

            <Button type="submit">Done!</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProfileEdit;
