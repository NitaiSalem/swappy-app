import WelcomeSection from "./home-search/Welcome&search";
import Benefits from "./benefits/Benefits";
import Destinations from "./destinations/Destinations";
import Footer from "../footer/Footer";


const HomePage = () => {

return(
    <div className='home-page'> 
  <WelcomeSection/> 
  <Benefits/> 
  <Destinations/> 
 <Footer/> 
  </div>
)
}

export default HomePage; 