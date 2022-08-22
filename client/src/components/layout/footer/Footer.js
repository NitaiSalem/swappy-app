import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ position, display }) => {
  return (
    <div
      className="footer-container"
      style={{ position: position, display: display }}
    >
      <div className="footer-row">
        <Link to="/">Terms of use</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Site map</Link>
      </div>
      <div>
        <p>Copyright (c) 2022 Swappy all rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
