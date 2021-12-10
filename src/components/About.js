import React from "react";
import HomeLink from "./links/HomeLink";
import ViewPileLink from "./links/ViewPileLink";
import "./../css/About.css";
const About = () => {
  return (
    <div className="about-page-wrapper">
      <div className="about-header-wrapper">
        <div className="about-home-link header-link">
          <HomeLink />
        </div>
        <div className="about-viewpile-link header-link">
          <ViewPileLink />
        </div>
      </div>
      <div className="about-page-content-wrapper">
        <h1>Content coming soon !</h1>
      </div>
    </div>
  );
};

export default About;
