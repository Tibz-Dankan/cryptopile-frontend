import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./../App.css";

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
    <div className="logout-wrapper">
      {isLoggedIn ? (
        <h4 className="logout-message">Bye Bye See You Later !</h4>
      ) : (
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
      )}
    </div>
  );
};

export default Logout;
