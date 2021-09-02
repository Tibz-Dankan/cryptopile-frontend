import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div className="not-logged-in-message">
      <p> You are not logged in</p>
      <p>
        Don't have an account,{" "}
        <Link to="/signup" className="links-in-logout-component">
          signup
        </Link>
      </p>
      <p>
        Have an account,{" "}
        <Link to="/login" className="links-in-logout-component">
          Login
        </Link>
      </p>
      <p>
        Go{" "}
        <Link to="/" className="links-in-logout-component">
          home
        </Link>
      </p>
    </div>
  );
};

export default NotLoggedIn;
