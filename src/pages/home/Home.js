import React, { useState, useCallback } from "react";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import "./Home.css";
import { List, X } from "react-bootstrap-icons";
import LoggedInAs from "../../components/UI/LoggedInAs/LoggedInAs";
const Home = () => {
  const [showMenuBar, setShowMenuBar] = useToggle();

  return (
    <div
      className="home-page-wrapper"
      // style={{
      //   // backgroundImage: `url("https://res.cloudinary.com/dlmv4ot9h/image/upload/v1641992849/pn2aozlq0zulc2yz25ho.jpg")`,
      //   backgroundImage: `url(https://res.cloudinary.com/dlmv4ot9h/image/upload/v1647263806/xwi9r12edlnqlov9cewh.jpg)`,
      //   // backgroundImage: `url(${backgroundImageUrl})`,
      //   width: "100%",
      //   height: "100%",
      //   backgroundSize: "cover",
      //   filter: "opacity(0.9)",
      // }}
    >
      <div className="home-header-wrapper">
        <div className="logo-wrapper">CryptoPile</div>
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
      <LoggedInAs />
      <div className="home-page-content">
        <div className="cryptopile-short-description">
          <div className="description-content">
            <h3>Welcome To CryptoPile</h3>
            <p>A Todo Application </p>
            <p>WITH</p>
            <p>Authentication,</p>
            <p>Authorization</p>
            <p> AND </p>
            <p> Encryption </p>
          </div>
        </div>
        <div className="cards-container">
          <div className="cards add-todos-card">
            <p>Add Todos </p>
          </div>
          <div className="cards see-todos-card">
            <p> See Todos</p>
          </div>
          <div className="cards edit-todos-card">
            <p>Edit Todos</p>
          </div>
          <div className="cards delete-todos-card">
            <p>Delete Todos</p>
          </div>
          <div className="cards encrypted-todos-card">
            <p>All Todos are Encrypted</p>
          </div>
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
