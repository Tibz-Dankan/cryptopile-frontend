import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import axiosApiUnAuthorized from "./axiosUnAuthorized";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Eye, EyeSlash, HouseFill } from "react-bootstrap-icons";
import "./../css/Login.css";
import ResendVerificationLink from "./ResendVerificationLink";

const Login = () => {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showLoginErrors, SetShowLoginErrors] = useState("");
  const [showLoginSuccess, SetShowLoginSuccess] = useState("");
  const [showFadeLoader, setShowFadeLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [didNotReceiveVerificationEmail, setDidNotReceiveVerificationEmail] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let history = useHistory();

  // function to disable a button
  const disableButton = () => {
    document.getElementById("button").disabled = true;
  };

  // function to enable a button
  const enableButton = () => {
    document.getElementById("button").disabled = false;
  };

  //  function to show password first by changing the state to true
  const showingPassword = () => {
    switch (showPassword) {
      case true:
        setShowPassword(false);
        break;
      case false:
        setShowPassword(true);
        break;
      default:
    }
  };

  // submit the user login details
  const submitLoginInfo = async (e) => {
    e.preventDefault();
    try {
      disableButton();
      setShowFadeLoader(true);
      SetShowLoginSuccess("");
      setShowCaughtError(false);
      setDidNotReceiveVerificationEmail(false);
      SetShowLoginErrors("");

      const response = await axiosApiUnAuthorized.post("/login", {
        email: userLoginInfo.email,
        password: userLoginInfo.password,
      });
      console.log(response);
      if (response.status === 200) {
        setShowFadeLoader(false);
        SetShowLoginErrors(response.data.loginStatusMsg);
        SetShowLoginSuccess(response.data.success);
        enableButton();
        if (
          response.data.loginStatusMsg === "You have successfully logged in"
        ) {
          localStorage.setItem("isLoggedIn", "isLoggedIn");
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("userId", response.data.userId);
          history.push("/todos");
        }
        //when user is not verified
        if (response.data.partlyRegisteredEmail) {
          localStorage.setItem(
            "partlyRegisteredEmail",
            response.data.partlyRegisteredEmail
          );
          setDidNotReceiveVerificationEmail(true);
          window.scrollTo(0, 0);
        }
      }
    } catch (error) {
      enableButton();
      setShowCaughtError(true);
      setShowFadeLoader(false);
      console.log(error);
    }
  };

  // Handle the changes
  const handleLoginInfo = (e) => {
    const checkLoginInfo = { ...userLoginInfo };
    checkLoginInfo[e.target.id] = e.target.value; // some RS
    setUserLoginInfo(checkLoginInfo);
  };

  // component to guide thw user who is not verified should be created

  return (
    <Fragment>
      <div className="login-page-wrapper">
        <div className="login-header-wrapper">
          <div className="login-home-link">
            <HouseFill
              size={18}
              color={"hsl(0, 0%, 100%)"}
              style={{ marginRight: "3px" }}
            />
            <HomeLink />
          </div>
        </div>
        {didNotReceiveVerificationEmail ? <ResendVerificationLink /> : null}
        {showCaughtError ? (
          <div className="login-catch-error" style={{ textAlign: "center" }}>
            <p style={{ color: "hsl(0, 100%, 50%)" }}>
              Sorry, something went wrong!
            </p>
          </div>
        ) : null}
        <div className="login-form-wrapper">
          <form onSubmit={(e) => submitLoginInfo(e)} className="login-form">
            <div className="login-form-heading">
              <h3>Log Into Your Account</h3>
            </div>
            <div className="display-login-status">
              <p className="display-login-errors">{showLoginErrors}</p>
              <p className="display-login-success">{showLoginSuccess}</p>
            </div>
            <div className="beat-loader-component-wrapper">
              {showFadeLoader ? (
                <div className="beat-loader-component-wrapper">
                  <FadeLoader
                    className="beat-loader"
                    color="hsl(180, 100%, 30%)"
                    size={5}
                  />
                  <h5 className="authenticate-msg">Authenticating...</h5>
                </div>
              ) : null}
            </div>
            <div className="fields">
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
              <div className="password-input-field-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input-field login-input-field-password"
                  id="password"
                  value={userLoginInfo.password}
                  onChange={(e) => handleLoginInfo(e)}
                  required
                />
                <div className="login-eye-icon" onClick={showingPassword}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </div>
              </div>
            </div>
            <br />
            <br />
            <button type="submit" className="login-btn" id="button">
              Login
            </button>
          </form>
          <p>
            Is this your first time here?{" "}
            <Link to="/signup" className="link">
              SignUp
            </Link>
          </p>
          <p className="forgot-password">
            <Link to="/forgot-password" className="link  forgot-password">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
