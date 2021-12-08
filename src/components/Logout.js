import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
import "./../css/Logout.css";

const Logout = () => {
  let history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutUser = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("userId");
    await localStorage.removeItem("isLoggedIn");
    history.push("/login");
  };
  // logout user on loading the component
  useEffect(() => {
    // firt check whetther the user is logged in
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      // logout the user
      logoutUser();
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div className="logout-wrapper">
          <h4 className="logout-message">Bye Bye See You Later !</h4>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Logout;
