import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState, useRef, useMemo } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ImageCarousel = ({
  homeImages,
  setIsCarouselOpen,
  isCarouselOpen,
  setCarouselClass,
}) => {
  const [shouldRender, setRender] = useState(isCarouselOpen);
  // const outsideClickRef = useRef();
  const carouselButtonsArr = [ "carousel-image-container","control-arrow control-next", "control-arrow control-prev", "dot", "dot selected", "thumb selected", "thumb"]

  useEffect(() => {
    console.log("iscarousel open in useffect", isCarouselOpen);
    if (isCarouselOpen) {setRender(true)
    
    document.getElementById("navbar").style.display= "none"; 
    }
    else {document.getElementById("navbar").style.display= "flex"}; 

  }, [isCarouselOpen]);

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

  function useOnClickOutside( carouselButtonsClasses, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          console.log("this is event target classname", event.target.className )
          // Do nothing if clicking ref's element or descendent elements

if(carouselButtonsClasses.includes(event.target.className)){
return; 
}

          // if (!ref.current || ref.current.contains(event.target)) {
          //   return;
          // }


          //carousel-image-container
          //carousel carousel-slider
          //carousel-wrapper-custom
          //thumbs-wrapper axis-vertical
          //control-dots
          //carousel-root

          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because the passed-in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
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
          {/* <button onClick={handleClose} className="close-carousel"> */}
            <CloseIcon onClick={handleClose} className="close-carousel" style={{color: "#ffffff"}} fontSize= "large"/>
      
          <Carousel infiniteLoop={true} useKeyboardArrows={true} autoFocus >
            {/* loop images here */}

            {homeImages &&
              homeImages.map((imageObj) => {
                return (
                  <div  
                    className="carousel-image-container"
                  >
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
