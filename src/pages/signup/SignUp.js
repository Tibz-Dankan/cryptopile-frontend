/* eslint-disable no-unused-vars */
import { React, Fragment, useState } from "react";
import HomeLink from "../../links/HomeLink";
import axiosApiUnAuthorized from "../../constants/AxiosApi/axiosUnAuthorized";
import MiniFooter from "../../components/layouts/MiniFooter/MiniFooter";
import CustomHeader from "../../components/layouts/CustomHeader/CustomHeader";
import { SquareLoader } from "react-spinners";
import { Eye, EyeSlash, HouseFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Signup.css";
import { enableButton, disableButton } from "../../utils/ButtonState";
import { log } from "../../utils/ConsoleLog";

const SignUp = () => {
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showWhenSuccessfullyRegistered, setShowWhenSuccessfullyRegistered] =
    useState(false);
  const [successfullyRegisteredInfo, setSuccessfullyRegisteredInfo] =
    useState("");
  let isVerifiedEmail = false;
  // checking the email to ensure that is unique
  const [emailValidityMsg, setEmailValidityMsg] = useState("");
  const [showEmailValidityMsg, setShowEmailValidityMsg] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [hideRegistrationForm, setHideRegistrationForm] = useState(false);
  const [showSquareLoader, setShowSquareLoader] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
  const [showPasswordDontMatchMsg, setShowPasswordDontMatchMsg] =
    useState(false);
  const [passwordLength, setPasswordLength] = useState("");
  const [showPasswordLengthMsg, setShowPasswordLengthMsg] = useState(false);

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  //  function to show password first by changing the state to true
  const showingPasswordOne = () => {
    switch (showPasswordOne) {
      case true:
        setShowPasswordOne(false);
        break;
      case false:
        setShowPasswordOne(true);
        break;
      default:
    }
  };

  //  function to show password second(confirm password) by changing the state to true
  const showingPasswordTwo = () => {
    switch (showPasswordTwo) {
      case true:
        setShowPasswordTwo(false);
        break;
      case false:
        setShowPasswordTwo(true);
        break;
      default:
    }
  };

  //check password match
  const checkPasswordMatch = () => {
    setShowPasswordDontMatchMsg(false);
    setShowCaughtError(false);
    setPasswordLength("");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword) {
      return true;
    } else {
      setShowPasswordDontMatchMsg(true);
      setPasswordMatch("**Passwords don't match");
      return false;
    }
  };

  //check password length
  const checkPasswordLength = () => {
    setShowPasswordLengthMsg(false);
    setShowCaughtError(false);
    setPasswordMatch("");
    const password = document.getElementById("password").value;
    if (password.length >= 6 && password.length <= 15) {
      return true;
    } else {
      setShowPasswordLengthMsg(true);
      setPasswordLength(
        "**Passwords must be at least 6 characters and must not exceed 15"
      );
      return false;
    }
  };

  // check for spaces in the password  // to be done

  // function to ensure that password contains symbols here

  // Handle the changes
  const handleRegistrationInfoChange = (e) => {
    const newRegistrationInfo = { ...registrationInfo };
    newRegistrationInfo[e.target.id] = e.target.value; // research for understanding purposes
    setRegistrationInfo(newRegistrationInfo);
  };

  // submit registration details
  const submitRegistrationInfo = async (e) => {
    try {
      // e.preventDefault();
      window.scrollTo(0, 0);
      disableButton("button");
      setShowSquareLoader(true);
      setShowEmailValidityMsg(false);
      setEmailValidityMsg("");
      setPasswordMatch("");
      setPasswordLength("");
      setShowCaughtError(false);
      const response = await axiosApiUnAuthorized.post("/signup", {
        firstName: registrationInfo.firstName,
        lastName: registrationInfo.lastName,
        email: registrationInfo.email,
        password: registrationInfo.password,
        confirmPassword: registrationInfo.confirmPassword,
        isVerifiedEmail: isVerifiedEmail,
      });
      log(response);
      if (response.status === 200) {
        setShowSquareLoader(false);
        enableButton("button");
        if (response.data.email === registrationInfo.email) {
          // frontend email === backend email
          setRegistrationInfo({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm_password: "",
          });
          setShowWhenSuccessfullyRegistered(true);
          setSuccessfullyRegisteredInfo(response.data);
          setHideRegistrationForm(true);
        } else {
          window.scrollTo(0, 0);
          // Email check after a successful request
          setShowEmailValidityMsg(true);
          setEmailValidityMsg(response.data.emailValidationMsg);
          // Password check after a successful request
        }
      }
    } catch (err) {
      setShowSquareLoader(false);
      enableButton("button");
      window.scrollTo(0, 0); // scroll to top
      log(err);
      setShowCaughtError(true);
    }
  };

  // checking password validity on submitting the form
  const validatePasswordOnSubmittingForm = (e) => {
    e.preventDefault();
    checkPasswordLength() && checkPasswordMatch() && submitRegistrationInfo(); // short hand for if statement
  };

  return (
    <Fragment>
      <div className="signup-page-wrapper">
        {/* <div className="signup-header-wrapper">
          <div className="signup-home-link">
            <HouseFill
              color={"hsl(0, 0%, 100%)"}
              size={18}
              style={{ marginRight: "3px" }}
            />
            <HomeLink />
          </div>
        </div> */}
        <CustomHeader />
        {showWhenSuccessfullyRegistered && (
          <div className="show-when-successfully-registered">
            <p>
              You has been successfully registered using the email,{" "}
              {successfullyRegisteredInfo.email}
            </p>
            <p>
              You can now log into your Account{" "}
              <Link className="link" to="/login">
                Log In
              </Link>
            </p>
            {/* <p>
              A confirmation email has been sent to{" "}
              {successfullyRegisteredInfo.email}
            </p> */}
          </div>
        )}
        {showCaughtError && (
          <div className="signup-catch-error">
            <p>Sorry, something went wrong!</p>
          </div>
        )}
        {showSquareLoader && (
          <div className="square-loader">
            <SquareLoader
              color="hsl(180, 100%, 30%)"
              size={30}
              style={{ marginRight: "3px" }}
            />
            <h4>Validating Your Email...</h4>
          </div>
        )}
        {hideRegistrationForm ? null : (
          <div className="registration-form-wrapper">
            <form
              onSubmit={validatePasswordOnSubmittingForm}
              className="registration-form"
            >
              <h3 className="registration-form-heading">Create Account</h3>
              <input
                type="text"
                id="firstName"
                className="signup-input-field"
                value={registrationInfo.firstName}
                onChange={(e) => handleRegistrationInfoChange(e)}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="signup-input-field"
                id="lastName"
                value={registrationInfo.lastName}
                onChange={(e) => handleRegistrationInfoChange(e)}
                placeholder="Last Name"
                required
              />
              {showEmailValidityMsg && (
                <p className="email-validity-msg">{emailValidityMsg}</p>
              )}
              <input
                type="email"
                className="signup-input-field"
                id="email"
                value={registrationInfo.email}
                onChange={(e) => handleRegistrationInfoChange(e)}
                placeholder="Email"
                required
              />
              {showPasswordDontMatchMsg && (
                <p className="check-password-match">{passwordMatch}</p>
              )}
              {showPasswordLengthMsg && (
                <p className="check-password-length">{passwordLength}</p>
              )}
              <div className="signup-input-field-wrapper">
                <input
                  type={showPasswordOne ? "text" : "password"}
                  className="signup-input-field-password"
                  id="password"
                  value={registrationInfo.password}
                  onChange={(e) => handleRegistrationInfoChange(e)}
                  placeholder="Password"
                  required
                />
                <div className="signup-eye-icon" onClick={showingPasswordOne}>
                  {showPasswordOne ? <EyeSlash /> : <Eye />}
                </div>
              </div>
              <div className="signup-input-field-wrapper">
                <input
                  type={showPasswordTwo ? "text" : "password"}
                  className="signup-input-field-password"
                  id="confirmPassword"
                  value={registrationInfo.confirmPassword}
                  onChange={(e) => handleRegistrationInfoChange(e)}
                  placeholder="Confirm Password"
                  required
                />
                <div className="signup-eye-icon" onClick={showingPasswordTwo}>
                  {showPasswordTwo ? <EyeSlash /> : <Eye />}
                </div>
              </div>
              <button className="signup-btn" id="button">
                Create
              </button>
            </form>
            <p className="already-have-account">
              Already have an account?{" "}
              <Link to="/login" className="site-link">
                Log In
              </Link>
            </p>
          </div>
        )}
      </div>
      <MiniFooter />
    </Fragment>
  );
};
export default SignUp;
