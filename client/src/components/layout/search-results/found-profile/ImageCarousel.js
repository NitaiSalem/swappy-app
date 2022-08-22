import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ImageCarousel = ({
  homeImages,
  setIsCarouselOpen,
  isCarouselOpen,
}) => {
  const [shouldRender, setRender] = useState(isCarouselOpen);
  const carouselButtonsArr = [
    "carousel-image-container",
    "control-arrow control-next",
    "control-arrow control-prev",
    "dot",
    "dot selected",
    "thumb selected",
    "thumb",
  ];

  useEffect(() => {
    if (isCarouselOpen) {
      setRender(true);

      document.getElementById("navigation-bar").style.display = "none";
    } else {
      document.getElementById("navigation-bar").style.display = "flex";
    }
  }, [isCarouselOpen]);

  const onAnimationEnd = () => {
    if (!isCarouselOpen) setRender(false);
  };

  const handleClose = () => {
    setIsCarouselOpen(false);
  };

  function useOnClickOutside(carouselButtonsClasses, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (carouselButtonsClasses.includes(event.target.className)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [carouselButtonsClasses, handler]
    );
  }

  useOnClickOutside(carouselButtonsArr, () => setIsCarouselOpen(false));

  return (
    <div>
      {shouldRender && (
        <div
          className="carousel-wrapper-custom"
          style={{
            animation: `${
              isCarouselOpen ? "appearanceOpacity" : "closeOpacity"
            } 0.4s`,
          }}
          onAnimationEnd={onAnimationEnd}
        >
          <CloseIcon
            onClick={handleClose}
            className="close-carousel"
            style={{ color: "#ffffff" }}
            fontSize="large"
          />
          <Carousel infiniteLoop={true} useKeyboardArrows={true} autoFocus>
            {homeImages &&
              homeImages.map((imageObj) => {
                return (
                  <div key={imageObj.name} className="carousel-image-container">
                    <img
                      className="carousel-image"
                      src={imageObj.url}
                      alt="home"
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
