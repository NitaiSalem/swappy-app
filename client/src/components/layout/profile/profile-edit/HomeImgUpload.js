import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeImages } from "../../../../actions/profileDataActions";
import { useInView } from "react-intersection-observer";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const HomeImgUpload = ({ setInViewComponent, homeImages, setHomeImages }) => {
  const hiddenFileInput = useRef(null);
  const currHomeImg = useSelector((state) => state.homeImages);
  const currHomeImgUrls = currHomeImg.map((img) => img.url);
console.log({currHomeImgUrls})
  const [previewImages, setPreviewImages] = useState(currHomeImgUrls);

  const dispatch = useDispatch();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  const onFileChange = (e) => {
    console.log("e target files here ", e.target.files);
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    //* next step: limit number of uploaded pics
  console.log(  " e target files 0 here " ,e.target.files[0]); 
  let chosenFiles = [...e.target.files];
    setHomeImages( [...homeImages, ...chosenFiles]); 
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    console.log({homeImages})
    if (homeImages.length === 0) {
      // setPreviewImages([]);
      return;
    }
    // let previewImagesArr = [...homeImages];
    //*maybe iterate after making an array to get the inside values of the actual file? index 0 points to FileList that should be opened? 

// console.log({previewImagesArr})
    // for (const key of Object.keys(homeImages)) {
    //   imagesArr.push(URL.createObjectURL(homeImages[key]));
    // }

    // setPreviewImages(previewImages.push(homeImages[key]));



// *with every change to our homeimages state we add the 

  const objectUrls = homeImages.map((img) => {
    return URL.createObjectURL(img);
  });

  //!make sure no repeats! 
  //currHomeImgUrls use this original value with the updated images state 
console.log({objectUrls}); 
    setPreviewImages([...currHomeImgUrls, ...objectUrls]);

    //  free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrls);
  }, [homeImages]);

  useEffect(() => {
    inView && setInViewComponent("home-images-upload");
  }, [inView]);

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
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div
      className="home-images-upload-container"
      id="home-images-upload"
      ref={ref}
    >
      <div className="panel-heading">
        <h3>Photos </h3>
      </div>
      <div className="panel-body">
        <h3> Upload Home Image/s</h3>
        <Button
          variant="outlined"
          className="profileimg-upload-button"
          onClick={handleClick}
        >
          <CameraAltIcon /> &nbsp; add photos
        </Button>
        {/* {
  currHomeImg.length > 0 && 
  currHomeImg.map((img, i) => {
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
  })} */}

        {previewImages.length > 0 &&
          previewImages.map((img, i) => {
            return (
              <div className="image-container" key={i}>
                <img
                  key={i}
                  id={i}
                  src={img}
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

        <div>
          <input
            type="file"
            name="homeImages"
            ref={hiddenFileInput}
            onChange={onFileChange}
            multiple
            style={{ display: "none" }}
          />
        </div>
        <div>
          {/* <button className="btn btn-primary">
            Upload
          </button> */}
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   homeImages: state.homeImages,
//   //this passes the auth state from the root reducer as props to component
// });

export default memo(HomeImgUpload);
