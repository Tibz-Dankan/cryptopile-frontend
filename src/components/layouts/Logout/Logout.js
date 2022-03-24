import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import "./Logout.css";

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
    // first check whether the user is logged in
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      // logout the user
      logoutUser();
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
