import React, { useEffect } from "react";
import "./../App.css";

const Logout = () => {
  // logout the user
  const logoutUser = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("userId");
    //   refresh and redirect the user to the login page
    window.location = "/login";
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
