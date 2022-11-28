import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faHandPeace from "@fortawesome/fontawesome-free-solid/faHandPeace";
import faGlobe from "@fortawesome/fontawesome-free-solid/faGlobe";
import faShekelSign from "@fortawesome/fontawesome-free-solid/faShekelSign";

const Benefits = () => {
  return (
    <div className="benefits-container">
      <h1 className="benefits-header"> Why Swappy</h1>
      <h5 className="benefits-under-title">
        3 good reasons to exchange your apartment
      </h5>

      <div className="benefit-boxes-container">
        <div className="benefit-box">
          <FontAwesomeIcon
            style={{ color: "#068295" }}
            className="benefits-icon"
            icon={faGlobe}
            size="3x"
          />
          <h5 className="benefit-header">TRAVEL DIFFERENTLY</h5>
          <p className="benefit-text">
            Experience an authentic way to travel. Discover local cultures and
            immerse yourself in the life of your host.
          </p>
        </div>
        <div className="benefit-box">
          <FontAwesomeIcon
            style={{ color: "#068295" }}
            className="benefits-icon"
            icon={faShekelSign}
            size="3x"
          />
          <h5 className="benefit-header">SAVE MONEY</h5>
          <p className="benefit-text">
            Stay at a low price for your holidays or just for the weekend.
            Travel and enjoy even more.
          </p>
        </div>
        <div className="benefit-box">
          <FontAwesomeIcon
            style={{ color: "#068295" }}
            className="benefits-icon"
            icon={faHandPeace}
            size="3x"
          />
          <h5 className="benefit-header">COMPLETE PEACE OF MIND</h5>
          <p className="benefit-text">
            Swappy is with you before, during, and after your exchange.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
