import "./footerStyle.scss";
import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-row">
        <a href="">Terms of use</a>
        <a href="">Privacy Policy</a>
        <a href="">Site map</a>
      </div>
      <div>
        <p>Copyright (c) 2021 Swappy all rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
