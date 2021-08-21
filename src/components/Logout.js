import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./../App.css";

const Logout = () => {
  let history = useHistory();
  // logout the user
  const logoutUser = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("userId");
    await localStorage.removeItem("isLoggedIn");
    //direct to the login page
    history.push("/login");
  };
  // logout user on loading the component
  useEffect(() => {
    logoutUser();
  }, []);
  return (
    <div className="logout-wrapper">
      <h4 className="logout-message">Bye Bye See You Later !</h4>
    </div>
  );
};

export default Logout;
