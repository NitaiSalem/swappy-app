import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { Bed, SingleBed } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import WcIcon from "@mui/icons-material/Wc";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const UserDetails = ({ homeDetails }) => {
  return (
    <div className="info-section-box">
      <h5 className="info-section-title">
        <AssignmentTurnedInIcon /> &nbsp; Details
      </h5>
      <ul className="details-list">
        <li>
          <div className="icon-and-detail">
            <MapsHomeWorkIcon className="icon" /> Home type
          </div>
          <span> {homeDetails?.homeType}</span>
        </li>
        <li>
          <div className="icon-and-detail">
            <GroupIcon className="icon" /> Sleeps{" "}
          </div>
          <span>{homeDetails?.sleeps}</span>
        </li>
        <li>
          <div className="icon-and-detail">
            <SingleBed className="icon" /> Single beds{" "}
          </div>
          <span> {homeDetails?.singleBeds}</span>
        </li>
        <li>
          <div className="icon-and-detail">
            <Bed className="icon" /> Double beds{" "}
          </div>
          <span> {homeDetails?.doubleBeds}</span>
        </li>
        <li>
          <div className="icon-and-detail">
            <MeetingRoomIcon className="icon" /> Bedrooms{" "}
          </div>
          <span> {homeDetails?.bedRooms}</span>
        </li>
        <li>
          <div className="icon-and-detail">
            <WcIcon className="icon" /> Bathrooms{" "}
          </div>
          <span> {homeDetails?.bathRooms}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
