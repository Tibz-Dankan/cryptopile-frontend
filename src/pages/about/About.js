import React from "react";
import { Link } from "react-router-dom";
import { HouseFill, FileTextFill } from "react-bootstrap-icons";
import Footer from "../../components/layouts/Footer/Footer";
import "./About.css";
const About = () => {
  return (
    <div
      className="about-page-wrapper"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dlmv4ot9h/image/upload/v1647265198/s8k2eoakdzje1s3k2ehq.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="about-header-wrapper">
        <div className="about-home-link">
          <HouseFill
            size={19}
            style={{ marginRight: "3px", marginTop: "-3px" }}
          />
          <Link to="/" className="header-link-in-about-page">
            Home
          </Link>
        </div>
        <div className="about-todos-link">
          <FileTextFill style={{ marginRight: "3px" }} />
          <Link to="/todos" className="header-link-in-about-page">
            Todos
          </Link>
        </div>
      </div>
      <div className="about-page-content-wrapper">
        <p>
          CryptoPile is Todo application that allows you to add, read, edit and
          delete all your todos.
        </p>
        <p>
          All todos are properly encrypted before being stored in a postgres
          database
        </p>
        <p>
          We use bcrypt library for authentication and password hashing, Json
          Web Token (JWT) for authorization and aes-256-ctr algorithm together
          with Crypto class inbuilt nodejs for encryption
        </p>
      </div>
      <div className="about-page-footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default About;
