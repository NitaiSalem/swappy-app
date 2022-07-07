// import "./destinations.scss";
import { Router, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import Spinner from "../../../spinner/Spinner";
import { Grid } from "@mui/material";
import { destinationsData } from "./destinationsData";
import DestinationBox from "./DestinationBox";
// import telAviv from "../../../../assets/beach-telaviv.jpeg";

const Destinations = () => {
  return (
    <div className="destinations-container">
      <h1 className="destinations-header">Find your next destination</h1>
      <h4 className="destinations-sub-header">
        check out these popular cities around Israel
      </h4>
      <div className="images-container">
        <Grid container className="destinations-grid-container">
          {destinationsData.map((destination) => {
            return (
              <DestinationBox
                imageUrl={destination.imageUrl}
                searchValue={destination.searchValue}
                cityname={destination.text}
                key={destination.searchValue}
              />
            );
          })}
          {/* <Spinner /> */}
          <div className="destinations-description-container">
            <p className="destinations-description">
              Find a home swap in the Israel, with homes to exchange in more
              than 100 cities. House swap with Swappy allows you to discover
              Israel in a more authentic way by living like a local in
              <span> Tel Aviv</span>, <span> Jerusalem</span>,
              <span> Eilat</span>, or even
              <span> Petah Tikva!</span> Spend less and enjoy more when you
              visit big cities or cozy country towns. Authentic and safe, Swappy
              helps you organize your vacation with ease!
            </p>
          </div>
        </Grid>
      </div>

      {/* <Footer/>  */}
    </div>
  );
};

export default Destinations;
