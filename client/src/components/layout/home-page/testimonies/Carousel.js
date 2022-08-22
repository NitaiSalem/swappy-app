import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [dotLength, setDotLength] = useState(
    window.innerWidth > 990
      ? 3
      : window.innerWidth > 770 && window.innerWidth < 990
      ? 5
      : 9
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 990) {
        setDotLength(3);
      } else if (window.innerWidth < 770) {
        setDotLength(9);
      } else setDotLength(5);
    });

    return () => {
      window.removeEventListener("resize", setDotLength);
    };
  }, []);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = dotLength - 1;
    } else if (newIndex >= dotLength) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        updateIndex(activeIndex + 1);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="indicators">
          <button
            className="indicator-button"
            onClick={() => updateIndex(activeIndex - 1)}
          >
            <ArrowBackIosIcon />
          </button>
        </div>
        <div
          {...handlers}
          className="testimonies-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="inner"
            style={{
              transform:
                activeIndex === 4 && dotLength === 5
                  ? `translateX(-${350}%)`
                  : `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {React.Children.map(children, (child, index) => {
              return React.cloneElement(child);
            })}
          </div>
        </div>
        <div className="indicators">
          <button
            className="indicator-button"
            onClick={() => updateIndex(activeIndex + 1)}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <div className="dots-container">
        {[...Array(dotLength)].map((e, i) => {
          return (
            <button
              key={i}
              className={`${i === activeIndex ? "active" : ""}`}
              onClick={() => updateIndex(i)}
            >
              <CircleIcon style={{ fontSize: "12px" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
