import { React, Fragment, useState } from "react";
import "./../App.css";
import HomeLink from "./links/HomeLink";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "./../css/Signup.css";

const SignUp = () => {
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showWhenSuccessfullyRegistered, setShowWhenSuccessfullyRegistered] =
    useState(false);
  const [successfullyRegisteredInfo, setSuccessfullyRegisteredInfo] =
    useState("");
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  // checking the email to ensure that is unique
  const [emailValidityMsg, setEmailValidityMsg] = useState("");
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [hideRegistrationForm, setHideRegistrationForm] = useState(false);
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [catchError, setCatchError] = useState("");

  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordLength, setPasswordLength] = useState("");

  //check password match
  const checkPasswordMatch = () => {
    setShowCaughtError(false);
    setPasswordLength("");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword) {
      return true;
    } else {
      setPasswordMatch("**Passwords don't match");
      return false;
    }
  };

  //check password length
  const checkPasswordLength = () => {
    setShowCaughtError(false);
    setPasswordMatch("");
    const password = document.getElementById("password").value;
    if (password.length >= 6 && password.length <= 15) {
      return true;
    } else {
      setPasswordLength(
        "**Passwords must be at least 6 characters and must not exceed 15"
      );
      return false;
    }
  };

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
      setShowBarLoader(true);
      setEmailValidityMsg("");
      setPasswordMatch("");
      setPasswordLength("");
      setCatchError("");
      const response = await axios.post(
        // "https://stockpile-backend.herokuapp.com/register",
        "http://localhost:5000/register",
        {
          firstName: registrationInfo.firstName,
          lastName: registrationInfo.lastName,
          email: registrationInfo.email,
          gender: registrationInfo.gender, // to be dropped
          password: registrationInfo.password,
          confirmPassword: registrationInfo.confirmPassword,
          isVerifiedEmail: isVerifiedEmail,
        }
      );
      console.log(response); // to be removed
      if (response.status === 200) {
        setShowBarLoader(false);
        if (response.data.email === registrationInfo.email) {
          // frontend email === backend email
          setRegistrationInfo({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
            confirm_password: "",
          });
          setShowWhenSuccessfullyRegistered(true);
          setSuccessfullyRegisteredInfo(response.data);
          setHideRegistrationForm(true);
        } else {
          window.scrollTo(0, 0);
          // Email check after a successful request
          setEmailValidityMsg(response.data.emailValidationMsg);
          // Password check after a successful request
        }
      }
    } catch (err) {
      setShowBarLoader(false);
      window.scrollTo(0, 0); // scroll to top
      console.log(err);
      setShowCaughtError(true);
      setCatchError("sorry, something went wrong!");
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
        <div className="signup-header-wrapper">
          <div className="signup-home-link">
            <HomeLink />
          </div>
        </div>
        {showWhenSuccessfullyRegistered ? (
          <div className="show-when-successfully-registered">
            <p>
              A confirmation link has been sent to{" "}
              {successfullyRegisteredInfo.email}
            </p>
          </div>
        ) : null}
        {showCaughtError ? (
          <div className="catch-error">
            <p>{catchError}</p>
          </div>
        ) : null}
        {showBarLoader ? (
          <div className="bar-loader">
            <BarLoader color="lightseagreen" />
            <h4>checking email existence...</h4>
          </div>
        ) : null}
        {hideRegistrationForm ? null : (
          <div className="registration-form">
            <form onSubmit={validatePasswordOnSubmittingForm}>
              <h3 className="registration-form-heading">Create An Account</h3>
              <label>Firstname:</label>
              <br />
              <input
                type="text"
                id="firstName"
                className="signup-input-field"
                value={registrationInfo.firstName}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              <label>Lastname:</label>
              <br />
              <input
                type="text"
                className="signup-input-field"
                id="lastName"
                value={registrationInfo.lastName}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              <p className="email-validity-msg">{emailValidityMsg}</p>
              {/* <br /> */}
              <label>Email Address:</label>
              <br />
              <input
                type="email"
                className="signup-input-field"
                id="email"
                value={registrationInfo.email}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              {/* to be removed */}
              <label>Gender:</label>
              <br />
              <input
                type="text"
                id="gender"
                className="signup-input-field"
                value={registrationInfo.gender}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              <p className="check-password-match">{passwordMatch}</p>
              <p className="check-password-length">{passwordLength}</p>
              <label>Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="password"
                value={registrationInfo.password}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              <label>Confirm Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="confirmPassword"
                value={registrationInfo.confirmPassword}
                onChange={(e) => handleRegistrationInfoChange(e)}
                required
              />
              <br />
              <br />
              <button className="signup-btn">Create</button>
            </form>
            <p>
              Do you already have an account?{" "}
              <Link to="/login" className="link">
                login
              </Link>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default SignUp;
