import React, { useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./../css/Home.css";
import { List, X } from "react-bootstrap-icons";

const Home = () => {
  const [showMenuBar, setShowMenuBar] = useToggle();
  return (
    <div className="home-page-wrapper">
      <div className="home-header-wrapper">
        <div className="logo-wrapper logo-animation">CryptoPile</div>
        <div className="desktop-home-header-links">
          <Header />
        </div>
        <div className="menu-icon-wrapper" onClick={setShowMenuBar}>
          {showMenuBar ? (
            <div className="mobile-home-header-links">
              <X size={32} className="bootstrap-x-icon" />
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
      <div className="spinning-circular-logo logo-animation">CryptoPile</div>
      <div className="home-page-content">
        <div className="cryptopile-short-description">
          <div className="blank-div"></div>
          <h3>Welcome To CryptoPile</h3>
          <p>A Todo Application </p>
          <p>WITH</p>
          <p>Authentication,</p>
          <p>Authorization</p>
          <p> AND </p>
          <p> Encryption </p>
        </div>
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
