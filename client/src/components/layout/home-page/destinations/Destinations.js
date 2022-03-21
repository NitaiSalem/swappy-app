import './destinations.scss'
import { Router, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

const Destinations = () => {

    return (
        <div className='destinations-container'>
            <h1 className='destinations-header'>Find your next destination</h1>
            <div className='images-container'>
            <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>
   <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>
   <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>
   <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>
   <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>
   <a href="abc.com">
    <img src="abc.png"  alt='destination'/>
   </a>

            </div>
        </div>
    )
}

export default Destinations;

//use link for react router!
//use the Link component if you're using react-router.
/*
<Link to="https://github.com/Joeyryanbridges">
  <Image src="giticon.png" className="githubIcon" />
</Link>
*/


// so the request to /city here should get all the homes in DB that have city set  to that city.and then redirect to the search results page. 

