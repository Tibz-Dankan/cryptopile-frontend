import React, { useEffect, useState } from "react";
import "./../css/NotLoggedIn.css";
import { useHistory } from "react-router";

const NotLoggedIn = () => {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  let history = useHistory();
  const redirectToHomePage = () => {
    history.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === null) {
      setNotLoggedIn(true);
      setTimeout(() => {
        redirectToHomePage();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
