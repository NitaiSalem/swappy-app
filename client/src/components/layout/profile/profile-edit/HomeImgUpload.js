import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeImages } from "../../../../actions/profileDataActions";
import { useInView } from "react-intersection-observer";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const HomeImgUpload = ({ setInViewComponent, homeImages, setHomeImages }) => {
  const hiddenFileInput = useRef(null);
  const currHomeImg = useSelector((state) => state.homeImages);
  const currHomeImgUrls = currHomeImg.map((img) => img.url);
  const [previewImages, setPreviewImages] = useState(currHomeImg);
  const addImagesArray = [...Array(5 - previewImages.length)];

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
    let chosenFiles = [...e.target.files];
    const sumOfImages =
      homeImages.length + currHomeImgUrls.length + chosenFiles.length;
    sumOfImages <= 5 && setHomeImages([...homeImages, ...chosenFiles]);
  };

  useEffect(() => {
    if (homeImages.length === 0) {
      setPreviewImages(currHomeImg);
      return;
    }

    const objectUrls = homeImages.map((img) => {
      //create array of objects with name and url like our db
      return { url: URL.createObjectURL(img), name: img.name };
    });

    //currHomeImgUrls use this original value with the updated images state
    setPreviewImages([...currHomeImg, ...objectUrls]);

    //  free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrls);
  }, [homeImages, currHomeImg]);

  useEffect(() => {
    inView && setInViewComponent("home-images-upload");
  }, [inView]);

  const deleteHomeImg = (imageName) => {
    // check first if the image is in db already
    if (currHomeImg.find(({ name }) => imageName === name)) {
      axios
        .delete(
          `http://localhost:5000/api/user-edit-images/delete-home-image/${imageName}`
        )
        .then((res) => {
          console.log(res);
          dispatch(getHomeImages());
        })
        .catch((error) => {
          console.log(
            "this is catch error in delete",
            error.response.data.error
          );
        });
    } else {
      setPreviewImages(currHomeImg);
      setHomeImages(homeImages.filter((img) => img.name !== imageName));
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="panel" id="home-images-upload" ref={ref}>
      <div className="panel-heading-container">
        <h3>Photos </h3>
      </div>
      <div className="panel-body">
        <h3 className="panel-body-title"> Upload Home Image/s</h3>
        <div className="label-container">
          <Button
            variant="contained"
            className="home-img-upload-button"
            onClick={handleClick}
          >
            <CameraAltIcon /> &nbsp; add photos
          </Button>
        </div>
        <div className="home-images-box">
          {previewImages.length > 0 &&
            previewImages.map((img, i) => {
              return (
                <div className="home-image-box" key={i}>
                  <div className="delete-button-container">
                    <IconButton
                      className="delete-button"
                      aria-label="delete"
                      size="large"
                      onClick={() => deleteHomeImg(img.name)}
                    >
                      <DeleteIcon
                        fontSize="large"
                        style={{ fill: "#e85710" }}
                      />
                    </IconButton>
                  </div>
                  <img
                    key={i}
                    id={i}
                    className="home-img"
                    src={img.url}
                    alt="home pic"
                    width="100%"
                    height="100%"
                  />
                </div>
              );
            })}

          {addImagesArray.length > 0 &&
            addImagesArray.map((val,i) => {
              return (
                <div className="add-image-box" onClick={handleClick} key={i}>
                  <PhotoLibraryIcon fontSize="inherit" />

                  <p className="add-image"> + Add image</p>
                </div>
              );
            })}
        </div>
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
        <div></div>
      </div>
    </div>
  );
};

export default memo(HomeImgUpload);
