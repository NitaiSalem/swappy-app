import axios from "axios";
import {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getHomeImages} from "../../../../actions/profileDataActions";
import { useInView } from 'react-intersection-observer';

const HomeImgUpload = ({setInViewComponent}) => {
  const [images, setImages] = useState([]);
  const homeImg = useSelector((state) => state.homeImages);
  const dispatch = useDispatch();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const onFileChange = (e) => {
    setImages(e.target.files);
  };

  useEffect(() => {
   inView&& setInViewComponent("home-images-upload"); 
   
   }, [inView]);


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append("homeImages", images[key]);
      console.log(formData, "form data");
    }
    axios
      .post(
        "http://localhost:5000/api/user-edit-images/home-images",
        formData,
        {}
      )
      .then((res) => {
        console.log(res);
        dispatch(getHomeImages());
      });
  };

  const deleteHomeImg = (imageName) => {
    axios
      .delete(
        `http://localhost:5000/api/user-edit-images/delete-home-image/${imageName}`
      )
      .then((res) => {
        console.log(res);
        dispatch(getHomeImages());
      });
  };

  return (
    <div className="home-images-upload-container" id="home-images-upload" ref={ref}>
      <div className="row">
        {Array.isArray(homeImg) === true &&
          homeImg.map((img, i) => {
            return (
              <div className="image-container" key={i}>
                <img
                  key={i}
                  id={i}
                  src={img.url}
                  alt="home-pic"
                  width="100px"
                  height="100px"
                />
                <button
                  onClick={() => deleteHomeImg(img.name)}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  delete
                </button>
              </div>
            );
          })}
        <form onSubmit={onSubmit}>
          <h3>Upload Home Image/s </h3>
          <div className="form-group">
            <input
              type="file"
              name="homeImages"
              onChange={onFileChange}
              multiple
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
      <h2> h2</h2>
      <h2> h2</h2>
      <h2> h2</h2>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   homeImages: state.homeImages,
//   //this passes the auth state from the root reducer as props to component
// });

export default memo(HomeImgUpload);
