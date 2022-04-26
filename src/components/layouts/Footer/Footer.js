import React from "react";
import "./Footer.css";
import { Linkedin, Github, Twitter } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer-content">
        <p className="copyright-msg">
          Copyright &copy; 2022 CryptoPile. All rights reserved
        </p>
        <p className="cryptopile-founder-manager">
          CryptoPile is managed by Tibz Dankan
        </p>
        <p className="follow-msg">Follow Dankan on</p>
        <div className="footer-links-wrapper">
          <nav className="footer-link-with-icon">
            <Linkedin />
            <a
              href="https://www.linkedin.com/in/tibz-dankan-74158721b/?originalSubdomain=ug"
              className="footer-link"
            >
              LinkedIn
            </a>
          </nav>
          <nav className="footer-link-with-icon">
            <Twitter />
            <a href="https://twitter.com/TibzDankan" className="footer-link">
              Twitter
            </a>
          </nav>
          <nav className="footer-link-with-icon">
            <Github />
            <a href="https://github.com/Tibz-Dankan" className="footer-link">
              Github
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
