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
import Map from "../../../map/Map";
import "./profile-edit.style.scss";
import  ProfileTextField  from "./TextField";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [homeImages, setHomeImages] = useState([]);
  const homeDetails = useSelector((state) => state.homeDetails);
  const [details, setDetails] = useState({
    homeType: "",
    sleeps: 1,
    bedRooms: 1,
    singleBeds: 1,
    doubleBeds: 1,
    bathRooms: 1,
    aboutHome: homeDetails.aboutHome ? homeDetails.aboutHome : "",
  });
  const [amneties, setAmneties] = useState({});
  const [houseRules, setHouseRules] = useState({});
  const [inViewComponent, setInViewComponent] = useState(
    "profile-image-upload"
  );

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

  const onSubmit = (e) => {
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked
    const profileImg = new FormData();
    profileImg.append("profileImg", selectedImage);
    const homeImgData = new FormData();
    for (const key of Object.keys(homeImages)) {
      homeImgData.append("homeImages", homeImages[key]);
    }

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

    homeImages.length > 0 && dispatch(uploadHomeImages(homeImgData));
    dispatch(uploadHomeDetails(homeDetails));

    //! redirect to profile on submit
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
            <div className="panel">
              <div className="panel-heading">
                <h3 id="profile-image-upload">Upload Profile Image</h3>
              </div>
              <div className="panel-body">
                <ProfileImgUpload
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  setInViewComponent={setInViewComponent}
                />
                <h3 className="about-title">What will your guests love about your home</h3>

                <ProfileTextField
                  style={{ width: "100%" }}
                  value={details.aboutHome}
                  onChange={(e) => setDetails({...details, aboutHome: e.target.value})}
                  label="My Home..."
                  multiline
                  rows={5}
                   inputProps={{ maxLength: 300 }}
                />
              </div>
              
            </div>
            <HomeImgUpload
              homeImages={homeImages}
              setHomeImages={setHomeImages}
              setInViewComponent={setInViewComponent}
            />
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
              details= {details}
              setDetails= {setDetails}
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
