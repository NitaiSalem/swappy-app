import React, { useEffect, useState } from "react";
import "./testimonies.scss";
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

  const [dotLength, setDotLength] = useState(window.innerWidth > 990 ? 3 : 5);

  // const [elementWidth,setElementWidth]= useState(window.innerWidth > 990 ? "33.333%": "50%");
  // const dotLength = window.innerWidth > 990 ? 3 : 5;

  useEffect(() => {
    window.addEventListener("resize", () =>
    
      setDotLength(window.innerWidth >990 ? 3 : window.innerWidth > 770&& window.innerWidth <990 ?  5 : 9 )
    );

    return () => {
      window.removeEventListener("resize", setDotLength);
    };
  }, []);

  // let elementWidth;
  // if (window.innerWidth > 990) {
  //   elementWidth = "33.333%";
  // } else if (window.innerWidth > 750) {
  //   elementWidth = "50%";
  // } else elementWidth = "100%";

  // window.innerWidth < 990 ?
  //2 active items, 50% width & slide both 2 => translateX(-${activeIndex * 100}%)
  //*use these later to switchh 3 testimonies at a time

  // const updateIndex = (newIndex) => {
  //   if (newIndex < 0) {
  //     //i just know its 3 so update accordingly?
  //     newIndex = React.Children.count(children) - 1;
  //   } else if (newIndex >= React.Children.count(children)) {
  //     newIndex = 0;
  //   }
  //   setActiveIndex(newIndex);
  // };

  const updateIndex = (newIndex) => {
    console.log({ newIndex });
    if (newIndex < 0) {
      newIndex = dotLength-1;
    } else if (newIndex >= dotLength) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);

/*
    activeIndex === 4
                  ? `translateX(-${activeIndex * 50}%)`
                  : `translateX(-${activeIndex * 100}%)`,

*/ 


  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        updateIndex(activeIndex + 1);
      }
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
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
            //  style={{ transform: `translateX(-${ activeIndex * 100}%)` }}
            style={{
              transform:
              activeIndex === 4 && dotLength === 5
                  ? `translateX(-${350}%)`
                  : `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {React.Children.map(children, (child, index) => {
              //make this 33.333%??
              //?instead of this make the comp a grid that gets width responsively from vw?
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

        {/* {React.Children.map(children, (child, index) => {
            return (
              <button
                className={`${index === activeIndex ? "active" : ""}`}
                onClick={() => updateIndex(index)}
              >
                <CircleIcon     style={{fontSize: "12px"}}/>
            
              </button>
            );
          })} */}
      </div>
    </div>
  );
};

export default Carousel;
