import './benefits.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faShekelSign, faHandPeace} from '@fortawesome/fontawesome-free-solid'
const Benefits = () => {

    return (

        <div className= 'benefits-container'> 
        <h1 className='benefits-header'> Why Swappy</h1>
        <h5 className='benefits-header'>3 good reasons to exchange your apartment</h5>


        <div className='icons-container'>
        
<div className='benefit-box'><FontAwesomeIcon icon={faGlobe}  size="3x" /><h5>TRAVEL DIFFERENTLY</h5> <p>
Experience an authentic way to travel. 
Discover local cultures and immerse yourself in the life of your host.</p></div>
<div className='benefit-box'><FontAwesomeIcon icon={faShekelSign}  size="3x" /><h5>SAVE MONEY</h5><p>
Stay at a low price for your holidays or just for the weekend. Travel and enjoy even more.</p></div>
<div className='benefit-box'><FontAwesomeIcon icon={faHandPeace}  size="3x" /><h5>COMPLETE PEACE OF MIND</h5><p>
HomeExchange is with you before, during, and after your exchange.</p></div>

        </div>
        </div>
    )
}

export default Benefits; 