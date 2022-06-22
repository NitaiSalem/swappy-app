import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { getProfileImg } from "../../../../actions/profileDataActions";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import defaultImage from "../../../../assets/user-icon.png";
import ProfileTextField from "./TextField";

//to fix updating profileimg not rerendering we had to connect the FilesUploadComponent to redux store,
// pass it the profileimg state as props and after posting, making get request to get updated image!

const ProfileImgUpload = ({
  setInViewComponent,
  selectedImage,
  setSelectedImage,
  details,
  setDetails,
}) => {
  const [previewImage, setPreviewImage] = useState();
  const currProfileImg = useSelector((state) => state.profileImg);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);

  const onFileChange = (e) => {
    // e.target.value = null;
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage("not-selected-profile-image");
      return;
    }
    setSelectedImage(e.target.files[0]);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedImage) {
      setPreviewImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  useEffect(() => {
    console.log("this is in view", inView);
    inView && setInViewComponent("profile-image-upload");
  }, [inView]);


  const deleteProfileImg = () => {
    hiddenFileInput.current.value = "";
    selectedImage
      ? setSelectedImage(undefined)
      : axios
          .delete(
            "http://localhost:5000/api/user-edit-images/delete-profile-image"
          )
          .then((res) => {
            console.log(res);
            dispatch(getProfileImg());
          });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div id="profile-image-upload" className="panel" ref={ref}>
      <div className="panel-heading-container">
        <h3 >Upload Profile Image</h3>
      </div>
      <div className="panel-body">
        <div className="profile-image-upload-container"> 
        {currProfileImg || selectedImage ? (
          <div className="profile-image-box">
            <div className="delete-button-container">
              <IconButton
                className="delete-button"
                aria-label="delete"
                size="large"
                onClick={deleteProfileImg}
              >
                <DeleteIcon fontSize="large" style={{ fill: "#e85710" }} />
              </IconButton>
            </div>
            <img
              className="profile-img"
              src={selectedImage ? previewImage : currProfileImg}
              alt="profile pic"
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          /* use else here to render the icon like foundprofile */

          <div className="profile-image-box">
            <img
              className="profile-img"
              src={defaultImage}
              alt="profile pic"
              width="100%"
              height="100%"
            />
          </div>
        )}

        <div className="form-group">
          <input
            type="file"
            onChange={onFileChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          {/* </label>  */}
        </div>
        <Button
          variant="outlined"
          className="profileimg-upload-button"
          onClick={handleClick}
        >
          <CameraAltIcon /> &nbsp; choose image
        </Button>
        </div>
        <h3 className="panel-body-title">
          What will your guests love about your home
        </h3>
        <ProfileTextField
          style={{ width: "100%" }}
          value={details.aboutHome}
          onChange={(e) =>
            setDetails({ ...details, aboutHome: e.target.value })
          }
          label="My Home..."
          multiline
          rows={5}
          inputProps={{ maxLength: 300 }}
        />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profileImg: state.profileImg,
//   //this passes the auth state from the root reducer as props to component
// });

export default memo(ProfileImgUpload);

//export default connect(mapStateToProps, {getProfileImg})(ProfileImgUpload);
