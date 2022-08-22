import WelcomeSection from "./home-search/Welcome&search";
import Benefits from "./benefits/Benefits";
import Destinations from "./destinations/Destinations";
import Footer from "../footer/Footer";
import Testimonies from "./testimonies/Testimonies";

const HomePage = () => {
  return (
    <div className="home-page">
      <WelcomeSection />
      <Benefits />
      <Destinations />
      <Testimonies />
      <Footer />
    </div>
  );
};

export default HomePage;
