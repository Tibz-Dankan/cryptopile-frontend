/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useContext } from "react";
import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosUnAuthorized";
import { useHistory } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./LoginAdmin.css";
import ResendVerificationLink from "../ResendVerificationLink/ResendVerificationLink";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import { log } from "../../../utils/ConsoleLog";
import FeatureUnderMaintenance from "../FeatureUnderMaintenance/FeatureUnderMaintenance";
import ShowLoginFormContext from "../../../context/ShowLoginFormContext/ShowLoginFormContext";

const LoginAdmin = () => {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginErrorsMsg, SetLoginErrorsMsg] = useState("");
  const [loginSuccessMsg, SetLoginSuccessMsg] = useState("");
  const [showLoginStatusMsg, setShowLoginStatusMsg] = useState(false);
  const [showFadeLoader, setShowFadeLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [didNotReceiveVerificationEmail, setDidNotReceiveVerificationEmail] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginForm, setShowLogin] = useContext(ShowLoginFormContext);

  let history = useHistory();

  const changeShowLoginFormState = () => {
    switch (showLoginForm) {
      case true:
        setShowLogin(false);
        break;
      case false:
        setShowLogin(true);
        break;
      default:
    }
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
      disableButton("button");
      setShowFadeLoader(true);
      SetLoginSuccessMsg("");
      setShowCaughtError(false);
      setDidNotReceiveVerificationEmail(false);
      SetLoginErrorsMsg("");

      const response = await axiosApiUnAuthorized.post("/login-admin", {
        email: userLoginInfo.email,
        password: userLoginInfo.password,
      });

      log(response);
      if (response.status === 200) {
        setShowLoginStatusMsg(true);
        setShowFadeLoader(false);
        SetLoginErrorsMsg(response.data.loginStatusMsg);
        SetLoginSuccessMsg(response.data.success);
        enableButton("button");
        if (
          response.data.loginStatusMsg === "You have successfully logged in"
        ) {
          localStorage.setItem("isLoggedIn", "isLoggedIn");
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("role", response.data.role);
          // do some thing here please
          setTimeout(() => {
            window.location.reload(); // To be changed to something better
          }, 2000);
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
      enableButton("button");
      setShowCaughtError(true);
      setShowFadeLoader(false);
      log(error);
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
        {didNotReceiveVerificationEmail && <ResendVerificationLink />}
        {showCaughtError && (
          <div className="login-catch-error" style={{ textAlign: "center" }}>
            <p style={{ color: "hsl(0, 100%, 50%)" }}>
              Sorry, something went wrong!
            </p>
          </div>
        )}
        <div className="login-form-wrapper">
          <form onSubmit={(e) => submitLoginInfo(e)} className="login-form">
            <div className="login-form-heading">
              <h3>Log Into Your Account</h3>
            </div>
            {showLoginStatusMsg && (
              <div className="display-login-status">
                <p className="display-login-errors">{loginErrorsMsg}</p>
                <p className="display-login-success">{loginSuccessMsg}</p>
              </div>
            )}
            {showFadeLoader && (
              <div className="fade-loader-wrapper">
                <FadeLoader
                  className="fade-loader"
                  color="hsl(180, 100%, 30%)"
                  size={5}
                />
                <h5 className="authenticate-msg">Authenticating...</h5>
              </div>
            )}
            <div className="fields">
              <label>Email*</label>
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
              <label>Password*</label>
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
                <div
                  className="login-eye-icon"
                  onClick={() => showingPassword()}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </div>
              </div>
            </div>
            <br />
            <br />
            <button type="submit" className="login-btn" id="button">
              Log In
            </button>
          </form>
          <div>
            Is this your first time here?{" "}
            <span
              className="supposed-to-be-link"
              onClick={() => changeShowLoginFormState()}
            >
              SignUp
            </span>
          </div>
          <div className="forgot-password">
            {/* <Link to="/forgot-password" className="link  forgot-password">
              Forgot Password
            </Link> */}
            <FeatureUnderMaintenance
              targetInfo={
                <span className="supposed-to-be-link">ForgotPassword</span>
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default LoginAdmin;
