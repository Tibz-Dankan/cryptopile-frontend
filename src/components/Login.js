import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import axios from "axios";
// import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { TokenContext } from "./context/TokenContext";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";

const Login = (isLoggedIn) => {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [displayLoginErrors, SetDisplayLoginErrors] = useState("");
  const [displayLoginSuccess, SetDisplayLoginSuccess] = useState("");
  const [hideLoginForm, setHideLoginForm] = useState(false);
  const [displayBeatLoader, setDisplayBeatLoader] = useState(false);
  // const [isloggedIn, setIsLoggedIn] = useState(false)
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
    // on submitting display the beatloader
    setDisplayBeatLoader(true);
    //hide the error and success messages
    SetDisplayLoginSuccess("");
    SetDisplayLoginErrors("");
    const response = await axios.post("http://localhost:5000/login", {
      email: userLoginInfo.email,
      password: userLoginInfo.password,
    });
    console.log(response);
    // if the login is a success then make the input fields empty
    if (response.status === 200) {
      // stop the loading indicator
      setDisplayBeatLoader(false);
      // alert the user input anything geoes wrong
      SetDisplayLoginErrors(response.data.msg);
      SetDisplayLoginSuccess(response.data.success);
      if (response.data.success === "You have successfully logged in") {
        // hide login form
        setHideLoginForm(true);

        setUserLoginInfo({ email: "", password: "" }); //makes the input fields empty
        // set the token to the local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        // store the userid in the local storage
        localStorage.setItem("userId", response.data.userId);
        history.push("/mypile");
      }
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
            <div className="beat-loader-component-wrapper">
              {displayBeatLoader ? (
                <div>
                  {" "}
                  <BeatLoader className="beat-loader" color="lightseagreen" />
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
          <p>Is this your first time here? </p>
          <Link to="/signup" className="link">
            signup
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
