import React, { useEffect, useState } from "react";
import "./../css/NotLoggedIn.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const NotLoggedIn = () => {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  let history = useHistory();
  const redirectToHomePage = () => {
    history.push("/");
  };

  useEffect(() => {
    setNotLoggedIn(true);
    if (localStorage.getItem("isLoggedIn") === null) {
      setTimeout(() => {
        redirectToHomePage();
      }, 2000);
    }
  }, []);
  return (
    <div className="not-logged-in-wrapper">
      {notLoggedIn ? (
        <div className="not-logged-in-message">
          <h1>Not Logged In !</h1>
        </div>
      ) : null}
    </div>
  );
};

export default NotLoggedIn;
