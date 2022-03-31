import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState, useRef, useMemo } from "react";

const ImageCarousel = ({
  homeImages,
  setIsCarouselOpen,
  isCarouselOpen,
  setCarouselClass,
}) => {
  const [shouldRender, setRender] = useState(isCarouselOpen);

  useEffect(() => {
      console.log("iscarousel open in useffect", isCarouselOpen )
    if (isCarouselOpen) setRender(true);
  }, [isCarouselOpen]);
  //loop over homeimages array and get url property
  //   const containerRef = useRef(null);

  //   useEffect(() => {
  //     containerRef.current.focus();
  //   });
  const onAnimationEnd = () => {
    if (!isCarouselOpen) setRender(false);
  };

  const handleClose = () => {
    setIsCarouselOpen(false);
    // setTimeout(() => setIsCarouselOpen(false), 500);
    // setCarouselClass("carousel-wrapper-outside-close");
  };

  return (
    <div>
      {shouldRender && (
        <div
          className="carousel-wrapper-custom"
          style={{
            animation: `${
              isCarouselOpen ? "appearanceOpacity" : "closeOpacity"
            } 0.5s`,
          }}
          onAnimationEnd={onAnimationEnd}
        >
          <button onClick={handleClose} className="close-carousel">
            {" "}
            x
          </button>
          <Carousel infiniteLoop={true} useKeyboardArrows={true} autoFocus>
            {/* loop images here */}

            {homeImages &&
              homeImages.map((imageObj) => {
                return (
                  <div className="carousel-image-container">
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
