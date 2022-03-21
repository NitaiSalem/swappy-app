import axios from "axios";
import {memo, useState} from "react";
import {getProfileImg} from "../../../../actions/profileDataActions";
import { useDispatch, useSelector} from "react-redux";

//to fix updating profileimg not rerendering we had to connect the FilesUploadComponent to redux store,
// pass it the profileimg state as props and after posting, making get request to get updated image!

const ProfileImgUpload = () => {
  const [profileImg, setProfileImg] = useState("");
  const currProfileImg = useSelector((state) => state.profileImg);
  const dispatch = useDispatch();
console.log('profile image upload rendered')
  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    axios
      .post("http://localhost:5000/api/user-edit-images/profile-image", formData, {})
      .then((res) => {
        console.log(res);
        dispatch(getProfileImg());
      });
  };
  const deleteProfileImg = () => {
    axios
      .delete("http://localhost:5000/api/user-edit-images/delete-profile-image")
      .then((res) => {
        console.log(res);
        getProfileImg();
      });
  };

  return (
    <div className="image-upload-container">
      
        <img
          src={currProfileImg}
          alt="profile pic"
          width="100px"
          height="100px"
        />
        <button
          onClick={deleteProfileImg}
          type="button"
          className="btn btn-danger btn-sm"
        >
          delete
        </button>
        <form onSubmit={onSubmit}>
          <h3>Upload Profile-Image </h3>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
        <h2> h2</h2>
        <h2> h2</h2>
        <h2> h2</h2>
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
