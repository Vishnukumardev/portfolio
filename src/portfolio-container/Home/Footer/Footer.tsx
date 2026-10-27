import React from "react";
import "./Footer.css";
import shapeBg from "../../../assets/Home/shape-bg.png";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-parent">
        <img src={shapeBg} alt="Your Browser doesn't supports SVG" />
      </div>
    </div>
  );
};

export default Footer;
