import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import axios from "axios";
// import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { TokenContext } from "./context/TokenContext";
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./../css/Login.css";

const Login = (isLoggedIn) => {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [displayLoginErrors, SetDisplayLoginErrors] = useState("");
  const [displayLoginSuccess, SetDisplayLoginSuccess] = useState("");
  const [hideLoginForm, setHideLoginForm] = useState(false);
  const [displayFadeLoader, setDisplayFadeLoader] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [isloggedIn, setIsLoggedIn] = useState(false);
  // const { globalUserId, setGlobalUserId } = useContext(TokenContext);

  let history = useHistory();
  // const laoder
  const LoaderCSS = css`
    margin-top: 40px;
    margin-bottom: 10px;
    color: red;
  `;
  // submit the user login details
  const submitLoginInfo = async (e) => {
    e.preventDefault();
    try {
      // on submitting display the beatloader
      setDisplayFadeLoader(true);
      //hide the error and success messages
      SetDisplayLoginSuccess("");
      SetDisplayLoginErrors("");
      const response = await axios.post(
        // "https://stockpile-backend.herokuapp.com/login",
        "http://localhost:5000/login",
        {
          email: userLoginInfo.email,
          password: userLoginInfo.password,
        }
      );
      console.log(response);
      // if the login is a success then make the input fields empty
      if (response.status === 200) {
        // stop the loading indicator
        setDisplayFadeLoader(false);
        // alert the user input anything geoes wrong
        SetDisplayLoginErrors(response.data.msg);
        SetDisplayLoginSuccess(response.data.success);
        setCatchError(""); // should not display
        if (response.data.success === "You have successfully logged in") {
          // hide login form
          setHideLoginForm(true);

          setUserLoginInfo({ email: "", password: "" }); //makes the input fields empty
          setIsLoggedIn(true);
          //store the state in the local storage
          localStorage.setItem("isLoggedIn", "isLoggedIn");
          // set the token to the local storage
          localStorage.setItem("accessToken", response.data.accessToken);
          // store the userid in the local storage
          localStorage.setItem("userId", response.data.userId);
          history.push("/mypile");
        }
      }
    } catch (error) {
      console.log(error);
      setCatchError("Sorry, something went wrong!");
      setDisplayFadeLoader(false);
    }
  };
  // pass the token from the accessToken to the context hook
  //  setStoreAccessTokenGlobally(accessToken)
  // Handle the changes
  const handleLoginInfo = (e) => {
    const checkLoginInfo = { ...userLoginInfo };
    checkLoginInfo[e.target.id] = e.target.value; // some RS
    setUserLoginInfo(checkLoginInfo);
    console.log(checkLoginInfo);
  };
  return (
    <Fragment>
      <div className="login-page-wrapper">
        <div className="login-header-wrapper">
          <div className="login-home-link">
            <HomeLink />
          </div>
        </div>
        <div className="login-form">
          <form onSubmit={(e) => submitLoginInfo(e)}>
            <div className="display-login-status">
              <p className="display-login-errors">{displayLoginErrors}</p>
              <p className="display-login-success">{displayLoginSuccess}</p>
            </div>
            <div className="login-catch-error" style={{ textAlign: "center" }}>
              <p style={{ color: "lightyellow" }}>{catchError}</p>
            </div>
            <div className="beat-loader-component-wrapper">
              {displayFadeLoader ? (
                <div className="beat-loader-component-wrapper">
                  <FadeLoader
                    className="beat-loader"
                    color="lightseagreen"
                    size={5}
                  />
                  <h5 className="authenticate-msg">Authenticating...</h5>
                </div>
              ) : null}
            </div>
            {hideLoginForm ? (
              <div>
                <p>Login form hiding</p>
              </div>
            ) : (
              <div>
                <label>Email Address:</label>
                <br />
                <input
                  type="email"
                  className="login-input-field"
                  id="email"
                  value={userLoginInfo.email}
                  onChange={(e) => handleLoginInfo(e)}
                  required
                />
                <br />
                <br />
                <label>Password:</label>
                <br />
                <input
                  type="password"
                  className="login-input-field"
                  id="password"
                  value={userLoginInfo.password}
                  onChange={(e) => handleLoginInfo(e)}
                  required
                />
              </div>
            )}
            <br />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {/* <p>{storeAccessTokenGloabally}</p> for trail purposes */}
          <p>
            Is this your first time here?{" "}
            <Link to="/signup" className="link">
              signup
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
