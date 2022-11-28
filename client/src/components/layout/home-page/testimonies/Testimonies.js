import Carousel, { CarouselItem } from "./Carousel";
import { testimoniesData } from "./testimoniesData";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faQuoteLeft from "@fortawesome/fontawesome-free-solid/faQuoteLeft";
const Testimonies = () => {
  return (
    <div className="home-testimonies-container">
      <div className="home-testimonies-title-container">
        <h2 className="home-testimonies-title">The best way to travel</h2>
        <p className="home-testimonies-subtitle"> Hear from our members </p>
      </div>
      <Carousel>
        {testimoniesData.map((testimony) => {
          return (
            <CarouselItem key={testimony.name}>
              <div className="testimony-container">
                <div className="testimony-text-wrapper">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    style={{ color: "rgb(6, 130, 149,0.5)" }}
                  />
                  <p className="testimony-text">{testimony.text}</p>
                </div>
                <div className="testimony-user">
                  <div className="testimony-image-container">
                    <img
                      className="testimony-image"
                      src={testimony.imgUrl}
                      alt="user"
                    />{" "}
                  </div>
                  <div className="user-text-box"><p className= "testimony-name"> {testimony.name}</p> 
                  <p className= "user-date"> <AccessTimeIcon fontSize="10px" style={{marginRight: "5px" }} /> {testimony.memberDate}</p> 
                  </div> 
                </div>
             
              </div>
            </CarouselItem>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Testimonies;
