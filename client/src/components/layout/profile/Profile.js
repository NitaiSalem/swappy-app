import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../actions/authActions";
import {
  getHomeDetails,
  getProfileImg,
  getHomeImages,
} from "../../../actions/profileDataActions";
// import {getHomeImages} from "../../../actions/profileDataActions";
import Details from "./details/Details";
import ProfileEdit from "./profile-edit/ProfileEdit";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import Map from "../../map/Map";
import HomeMap from "../../map/homeMap";
// import GuideMap from "../../map/guideMap";

//store the API key in a .env file

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const profileImage = useSelector((state) => state.profileImg); //use these for rest of state from db
  const user = useSelector((state) => state.auth.user);
  const homeImages = useSelector((state) => state.homeImages);
  const homeDetails = useSelector((state) => state.homeDetails);

  const dispatch = useDispatch();

  const toggleEdit = (view) => {
    setEdit(view);
  };
  useEffect(() => {
    // console.log(props, "this is profile props");
    dispatch(getProfileImg());
    dispatch(getHomeImages());
    dispatch(getHomeDetails());
  }, []);

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  // if (!homeDetails.amneties) {
  //   //this works, find a nice animation for profile load later...
  //   return (
  //     <div>
  //       <p>loading...</p>
  //       <p>loading...</p>
  //       <p>loading...</p>
  //       <p>loading...</p>
  //       <p>loading...</p>
  //     </div>
  //   );
  // }
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
    //useffect to fetch image from db?
    <div
      style={{height: "100vh", marginTop: "100px"}}
      className="container valign-wrapper"
    >
      <button onClick={() => toggleEdit(true)}>
        <FontAwesomeIcon icon="edit" />
      </button>
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <div className="profile-img-container">
              <img
                src={profileImage}
                alt="profile pic"
                width="100px"
                height="100px"
              />
            </div>
            <p className="flow-text grey-text text-darken-1">
              You are logged into a full-stack{" "}
              <span style={{fontFamily: "monospace"}}>MERN</span> app 👏
            </p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
          <div className="home-images-container">
            <h2>images: </h2>
            {Array.isArray(homeImages) &&
              homeImages.map((img, i) => {
                return (
                  <div key={i} className="image-container">
                    <img
                      key={i}
                      id={i}
                      src={img.url}
                      alt="home-pic"
                      width="100px"
                      height="100px"
                    />
                  </div>
                );
              })}

            {edit && <ProfileEdit toggleEdit={toggleEdit} />}
            <div className="about-home-container">
              <h3>About my home:</h3>
              <p>{homeDetails.aboutHome}</p>
            </div>
            <Details />
            {houseLocation.lat && (
              <HomeMap houseLocation={houseLocation} height="300px" zoom={15} />
            )}

            {/* <GuideMap
       
       center={{lat: 32.082245577154886, lng: 34.77953600209961}}
       height='300px'
       zoom={15}
    
    />  */}
            <p>loading...</p>
            <p>loading...</p>
            <p>loading...</p>
            <p>loading...</p>
            <p>loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   //getProfileImg: propTypes.func.isRequired,
//   //potentially change to pass the whole user as props here?
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profileImg: state.profileImg,
//   homeImages: state.homeImages,
//   //this passes the auth state from the root reducer as props to component
// });
// export default connect(mapStateToProps, {
//   getProfileImg,
//   getHomeImages,
//   logoutUser,
// })(Profile);

export default Profile;
