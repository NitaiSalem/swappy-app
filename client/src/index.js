import React from "react";
import './fonts/AvertaDemoPECuttedDemo-Regular.otf'; 
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core"; //allows later to just use icon name to render-them
import {
  faBuilding,
  faHome,
  faBed,
  faDoorOpen,
  faBath,
  faEdit,
  faUserFriends,
  faMapMarkerAlt,
} from "@fortawesome/fontawesome-free-solid";
library.add(
  faBuilding,
  faHome,
  faBed,
  faDoorOpen,
  faBath,
  faEdit,
  faUserFriends,
  faMapMarkerAlt
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
