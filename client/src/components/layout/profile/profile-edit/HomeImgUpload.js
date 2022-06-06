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
  console.log({ currHomeImg });
  console.log({ hiddenFileInput });

  const currHomeImgUrls = currHomeImg.map((img) => img.url);
  console.log({ currHomeImgUrls });
  const [previewImages, setPreviewImages] = useState(currHomeImg);

  const dispatch = useDispatch();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  console.log({ previewImages });

  const onFileChange = (e) => {
    console.log("e target files here ", e.target.files);
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    console.log(" e target files 0 here ", e.target.files[0]);
    let chosenFiles = [...e.target.files];
    console.log("choose files length ", chosenFiles.length);
    console.log("current urls array length", currHomeImgUrls.length);
    console.log("homeimages state length", homeImages.length);
    console.log(
      "the sum of images added with homeimages",
      homeImages.length + currHomeImgUrls.length + chosenFiles.length
    );
    let sumOfImages =
      homeImages.length + currHomeImgUrls.length + chosenFiles.length;
    sumOfImages <= 5 && setHomeImages([...homeImages, ...chosenFiles]);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (homeImages.length === 0) {
      setPreviewImages(currHomeImg);
      return;
    }

    // *with every change to our homeimages state we add the

    const objectUrls = homeImages.map((img) => {
      //create array of objects with name and url like our db
      console.log("img inside objectUrls map ", img);
      return { url: URL.createObjectURL(img), name: img.name };
      // return URL.createObjectURL(img);
    });

    //!make sure no repeats!
    //currHomeImgUrls use this original value with the updated images state
    console.log({ objectUrls });
    console.log({ currHomeImgUrls });
    setPreviewImages([...currHomeImg, ...objectUrls]);

    //  free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrls);
  }, [homeImages, currHomeImg]);

  useEffect(() => {
    inView && setInViewComponent("home-images-upload");
  }, [inView]);

  const deleteHomeImg = (imageName) => {
    //*here check first if the image is in db already
    //?need to remove from homeimages state?
    //deleting by name from db works, just make sure to update the displayed images

    //? make sure to delete in db only if name of image is in the redux currhomeimg array??

    if (currHomeImg.find(({ name }) => imageName === name)) {
      console.log("entered delete condition from db"); 
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
      // .finally(() => {
      //    setPreviewImages(currHomeImg);
      //   setHomeImages(homeImages.filter((img) => img.name !== imageName));
      // });
    } else {
      console.log("entered else delete condition for local image"); 
      setPreviewImages(currHomeImg);
      setHomeImages(homeImages.filter((img) => img.name !== imageName));
    }
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
        {previewImages.length > 0 &&
          previewImages.map((img, i) => {
            return (
              <div className="image-container" key={i}>
                <img
                  key={i}
                  id={i}
                  //should be img.src from object
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
