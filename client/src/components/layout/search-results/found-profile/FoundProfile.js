import { useLocation } from "react-router-dom";
import "./found-profile.style.scss";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState, useRef } from "react";

const FoundProfile = () => {
  const { state } = useLocation();
  const {
    homeDetails: { houseLocation },
  } = state;
  const [isCarouselOpen, setIsCarouselOpen] = useState(false); //this is show!

  // const [carouselClass,setCarouselClass]= useState(isCarouselOpen?"carousel-wrapper-outside": "carousel-wrapper-outside-close" )

  console.log("this is state ", state);

  //*make first image visible first and onclick open carousel ?
  return (
    <div className="found-profile-container">
      <div className= "found-home-img-container"><button onClick={()=> setIsCarouselOpen(true)} ><img className = "found-profile-homeimg" src={state.homeImages[0].url} alt="homeimg"/> </button> </div>
        <div className={"carousel-wrapper-outside"}>
          <ImageCarousel  isCarouselOpen={isCarouselOpen} setIsCarouselOpen={setIsCarouselOpen} homeImages={state.homeImages} />
        </div>
     

      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>this isfound profile</h2>
      <h2>
        {" "}
        {state.name}`s Home in {houseLocation.area}{" "}
      </h2>
    </div>
  );
};

export default FoundProfile;
