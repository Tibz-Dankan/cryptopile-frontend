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
  // check password
  const [checkPasswordMatch, setCheckPasswordMatch] = useState(""); // should be done on the frontend
  const [hideRegistrationForm, setHideRegistrationForm] = useState(false);
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [catchError, setCatchError] = useState("");

  const submitRegistrationInfo = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setShowBarLoader(true); // start beatLoader
    setCatchError("");

    try {
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
        setShowBarLoader(false); // stop beatLoader
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
          //alert the user when successfully registered
          setShowWhenSuccessfullyRegistered(true);
          setSuccessfullyRegisteredInfo(response.data);
          // make the states for checking the errors empty
          setEmailValidityMsg("");
          setCheckPasswordMatch("");
          //hide the registration form
          setHideRegistrationForm(true);
        } else {
          // go back to the top after when displayin ght error
          window.scrollTo(0, 0);
          // Email check after a successful request
          setEmailValidityMsg(response.data.emailMsg);
          // Password check after a successful request
          setCheckPasswordMatch(response.data.passwordMsg); // to be handled on the frontend
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

  // Handle the changes
  const handleChange = (e) => {
    const newRegistrationInfo = { ...registrationInfo };
    newRegistrationInfo[e.target.id] = e.target.value; // research for understanding purposes
    setRegistrationInfo(newRegistrationInfo);
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
          <BarLoader color="lightseagreen" style={{ marginTop: "20px" }} />
        ) : null}
        {/* hiding the registration form after successful registration */}
        {hideRegistrationForm ? null : (
          <div className="registration-form">
            <form onSubmit={(e) => submitRegistrationInfo(e)}>
              <h3 className="registration-form-heading">Create An Account</h3>
              <label>Firstname:</label>
              <br />
              <input
                type="text"
                id="firstName"
                className="signup-input-field"
                value={registrationInfo.firstName}
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              {/*display email exists an email validity here */}
              <p
                className="email-validity-msg"
                // style={{ textAlign: "center", color: "red" }}
              >
                {emailValidityMsg}
              </p>
              {/* <br /> */}
              <label>Email Address:</label>
              <br />
              <input
                type="email"
                className="signup-input-field"
                id="email"
                value={registrationInfo.email}
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              {/* display password don't match  and comment to be removed*/}
              <p
                className="check-password-match"
                // style={{ textAlign: "center", color: "red" }}
              >
                {checkPasswordMatch}
              </p>
              <label>Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="password"
                value={registrationInfo.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              {/*password match msg here*/}
              <label>Confirm Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="confirmPassword"
                value={registrationInfo.confirmPassword}
                onChange={(e) => handleChange(e)}
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
