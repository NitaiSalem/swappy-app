import female from "./female-tourists-hand-have-happy-travel-map_1150-7411.jpg";
import appartment from "./home_design.110e92245ca990655ab4.jpg";
import coffee from "./photo-1604881988758-f76ad2f7aac1.jfif";
import handshake from "./handshake-for-blog.jpg";
import drive from "./shutterstock_305567459-1024x683.jpg";
import Footer from "../footer/Footer";

const About = () => (
  <div className="about-container">
    <h1 className="title">A quick guide to how it works</h1>
    <h5 className="under-title">
      Discover a new way of traveling, start swapping in just a few steps
    </h5>

    <div className="info-container">
      <h5> What is Swappy?</h5>
      <p>
        A home swap is as simple as it sounds. You exchange your home with
        another lovely person or family for a vacation. You get to choose your
        ideal home and location from thousands of beautiful character homes in
        over 100 countries, owned by the happiest community of members - so says
        Trustpilot! To get well on the way to your first home swap vacation just
        follow the steps below.
      </p>
    </div>
    <div className="steps-container">
      <img className="steps-image" src={female} alt="female tourist with map" />

      <div className="step-text">
        <h6 className="steps-title"> 1. Search for a swap</h6>
        <p>
          Use the Swappy website to search for your perfect vacation
          destination. Make sure to use the search filters to find the home you
          want. Maybe a place close to the beach, or one that allows you to
          bring your furry friend along.
        </p>
      </div>

      <div className="step-text">
        <h6 className="steps-title"> 2. Add your own home</h6>
        <p>
          Add a listing of your very own. Enter in your home details, its
          location and tell us all the best things about it. Then top it off by
          adding some photo’s to really wow your potential home swappers.
        </p>
      </div>
      <img className="steps-image" src={appartment} alt="flat pic" />

      <img className="steps-image" src={coffee} alt="talking over coffee" />
      <div className="step-text">
        <h6 className="steps-title"> 3. Talk to other Swappers</h6>
        <p>
          Use our direct messaging to contact other swappers about their
          listings. A simple “hey are you interested in swapping” is sometimes
          all you need to start a wonderful conversation. We don’t mind if you
          take the conversation offline to your email or video chat after you
          have made contact.
        </p>
      </div>

      <div className="step-text">
        <h6 className="steps-title"> 4. Agree to a swap </h6>
        <p>
          The final step is to agree on a swap. Make sure you nail down your
          dates and use some of our helpful swapping checklists and home manual
          guides available on our website so everything goes smoothly. Don’t
          forget swaps are usually a simple agreement between two people.
        </p>
      </div>
      <img
        className="steps-image"
        src={handshake}
        alt="handshaking closing deal"
      />

      <img
        className="steps-image"
        src={drive}
        alt="driving away to the sunset"
      />
      <div className="step-text">
        <h6 className="steps-title"> 5. Have a great time!</h6>
        <p>
          Now everything is done. Book your flights or gas up your car and
          prepare to have a great time living like a local and experiencing
          everything your vacation destination has to offer, whilst in the
          comfort of a lovely home!
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
