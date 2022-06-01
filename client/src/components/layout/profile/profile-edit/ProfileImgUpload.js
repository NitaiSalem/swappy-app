import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { getProfileImg } from "../../../../actions/profileDataActions";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import defaultImage from "../../../../site images/user-icon.png";

//to fix updating profileimg not rerendering we had to connect the FilesUploadComponent to redux store,
// pass it the profileimg state as props and after posting, making get request to get updated image!

const ProfileImgUpload = ({ setInViewComponent,selectedImage,setSelectedImage }) => {
  // const [selectedImage, setSelectedImage] = useState();
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

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("profileImg", selectedImage);
  //   axios
  //     .post(
  //       "http://localhost:5000/api/user-edit-images/profile-image",
  //       formData,
  //       {}
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       dispatch(getProfileImg());
  //     });
  // };


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
    <div className="profile-image-upload-container" ref={ref}>
      {(currProfileImg || selectedImage) ? (
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

      /* use else here to render the icon like foundprofile */

      ) : 
      <div className="profile-image-box">
              <img
            className="profile-img"
            src={defaultImage}
            alt="profile pic"
            width="100%"
            height="100%"
          />
         </div> 

      //
      }

      {/* <form onSubmit={onSubmit}> */}
        <div className="form-group">
          {/* <label for="inputTag"> */}
          {/* Select Image */}
          {/* <input id="inputTag" type="file" onChange={onFileChange} /> */}
          <input
            type="file"
            onChange={onFileChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          {/* </label>  */}
        </div>
        <Button variant="outlined" className="profileimg-upload-button" onClick={handleClick}>
       
          <CameraAltIcon /> &nbsp; choose image
        </Button>
        {/* <Button className="btn btn-primary" type="submit">
          Save image
        </Button> */}
      {/* </form> */}
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
