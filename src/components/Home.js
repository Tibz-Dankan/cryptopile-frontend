import React, { useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import HomeHeaderLogoutLink from "./links/HomeHeaderLogoutLink";
import "./../App.css";
import { Link } from "react-router-dom";
import { List, X } from "react-bootstrap-icons";

const Home = () => {
  const [showMenuBar, setShowMenuBar] = useToggle();
  return (
    <div className="home-page-wrapper">
      <div className="home-header-wrapper">
        <div className="logo-wrapper">STOCKPILE</div>
        <div className="desktop-home-header-links">
          <Header />
        </div>
        <div className="logout-header-link">
          {/* <HomeHeaderLogoutLink /> */}
        </div>
        <div className="menu-icon-wrapper" onClick={setShowMenuBar}>
          {showMenuBar ? (
            <div className="mobile-home-header-links">
              <X size={30} className="bootstrap-x-icon" />
              <div className="mobile-home-header-component">
                <Header />
              </div>
            </div>
          ) : (
            <div className="bootstrap-list-icon-wrapper">
              <List className="bootstrap-list-icon" size={25} />
            </div>
          )}
        </div>
      </div>
      <div className="home-page-content">
        <div className="home-page-welcome-heading">
          <h2>welcome to stockpile.com </h2>
        </div>
        <p>This is a place where everything you store with us is called pile</p>
        <p>
          <b>Pile</b> is common term used through the whole site.
        </p>
        <p>
          So having a better understanding of pile is vital to effectively use
          the stockpile.com
        </p>
        <p>
          <b>stockpile</b> is something saved for future use or a special
          purpose
        </p>
        <p>
          Therefore we are refering <b>Pile</b> as some piece of information you
          keep with stockpile.com for future use or special purpose
        </p>
        <p>
          If this is your first time here{" "}
          <Link to="/signup" className="link">
            signup
          </Link>{" "}
        </p>
        <p>
          {" "}
          Already have an account{" "}
          <Link to="/login" className="link">
            login
          </Link>
        </p>
      </div>
      <div className="home-footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};
// The function that takes the boolean parameter and returns its opposite value
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};
export default Home;
