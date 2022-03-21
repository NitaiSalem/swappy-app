//make as a component that renders when you click edit profile from inside profile comp.
import {useSelector, useDispatch} from "react-redux";
import DetailsUpload from "./DetailsUpload";
import AmnetiesUpload from "./AmnetiesUpload";
import HouseRulesUpload from "./HouseRulesUpload";
import HomeImgUpload from "./HomeImgUpload";
import ProfileImgUpload from "./ProfileImgUpload";
import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {
  getHomeDetails,
  uploadHomeDetails,
} from "../../../../actions/profileDataActions";
import Map from "../../../map/Map";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import BedroomChildIcon from "@mui/icons-material/BedroomChild";
//import Add from "@material-ui/icons/Add";

//maybe a Next button instead to move between components? with nice transition? check if possible to make css transition on new render? maybe changing the className?
//we can define a "Step" state here to move us between the edit components, the "Next" click will change the string value of state,
// => the "Back each component will be rendered if the state matches the condition.
//the state should remain between back and next because it is stored higher in "profileEdit."
//devide to 3 object: homeInfo: homeDetails,

const ProfileEdit = (props) => {
  const [homeType, setHomeType] = useState("");
  const [sleeps, setSleeps] = useState(1);
  const [bedRooms, setBedRooms] = useState(1);
  const [singleBeds, setSingleBeds] = useState(1);
  const [doubleBeds, setDoubleBeds] = useState(1);
  const [bathRooms, setBathRooms] = useState(1);
  const [amneties, setAmneties] = useState({});
  const [houseRules, setHouseRules] = useState({});
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
  //res => history.push("/profile") to use after edit
  //need an add about home section with textfield.

  useEffect(() => {
    dispatch(getHomeDetails());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); //we’ll use e.preventDefault() to stop the page from reloading when the submit button is clicked

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
    dispatch(uploadHomeDetails(homeDetails));
    props.toggleEdit(false);
  };
  //add map here, pass it
  return (
    <div className="profile-edit-container">
      <ProfileImgUpload />
      <h3>Tell others about your Home</h3>
      <TextField
        style={{width: "100%"}}
        value={aboutHome}
        onChange={(e) => setAboutHome(e.target.value)}
        label="My Home..."
        multiline
        rows={4}
      />
      <HomeImgUpload />
      <Map
        setHouseLocation={setHouseLocation}
        houseLocation={
          houseLocation.lat
            ? houseLocation
            : {lat: 32.079918405524154, lng: 34.77430033010254}
        }
        height="300px"
        zoom={13}
      />
      <DetailsUpload
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
      <AmnetiesUpload amneties={amneties} setAmneties={setAmneties} />
      <HouseRulesUpload houseRules={houseRules} setHouseRules={setHouseRules} />
      <Button onClick={onSubmit}>Done!</Button>
      <h2> h2</h2>
    </div>
  );
};

export default ProfileEdit;
