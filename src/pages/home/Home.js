/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import "./Home.css";
import LoggedInAs from "../../components/UI/LoggedInAs/LoggedInAs";
const Home = () => {
  return (
    <div className="home-page-wrapper">
      <Header />
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
export default Home;
