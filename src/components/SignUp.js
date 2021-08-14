import { React, Fragment, useState } from "react";
import "./../App.css";
import HomeLink from "./links/HomeLink";
import axios from "axios";
// import Select from "react-select"
import { BeatLoader } from "react-spinners";
// import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    password: "",
    confirm_password: "",
  });
  // state for the gender options
  const [gender, setGender] = useState("");
  // function to handle the gender changes
  const handleGenderChange = (e) => {
    const selectGender = e.target.value;
    setGender(selectGender);
    console.log(gender);
  };
  // object to store the options
  // const genders = [ {option:"Female"} , {option:"Male"}]

  // state to handle the gender select
  // const [genderOption, setGenderOption] = useState(genders.option)
  //handle the gender changes
  // const handleGenderChange = (e)=>{
  //   setGenderOption(e.option)
  //   console.log(genderOption)
  // }
  // upon successful regsitration
  const [successfullyRegisteredMsg, setSuccessfullyRegisteredMsg] = useState({
    email: "",
    password: "",
  });
  // state to display successfuly regsitered user
  const [displaySuccessfullyRegistered, setDisplaySuccessfullyRegistered] =
    useState(false);
  // submit the form
  // checking the email to ensure that is unique
  const [checkEmailStatusError, setCheckEmailStatusError] = useState("");
  // display this a user first visits the signup page
  const [firsDisplayMessage, setFirstDisplayMessage] = useState(
    "Create an account from here"
  );
  const [displayEmailOrPasswordError, setDisplayEmailOrPasswordError] =
    useState(false);
  // check password
  const [checkPasswordMatch, setCheckPasswordMatch] = useState("");
  // hiding the registration form
  const [hideRegistrationForm, setHideRegstrationForm] = useState(false);
  // show the beat loader
  const [displayBeatLoader, setDisplayBeatLoader] = useState(false);
  const [catchError, setCatchError] = useState("");

  const submitRegisterInfo = async (e) => {
    e.preventDefault();
    // scroll to the top upon submitting
    window.scrollTo(0, 0);
    // show the beat loader
    setDisplayBeatLoader(true);
    try {
      const response = await axios.post("http://localhost:500/register", {
        firstname: registerInfo.firstname,
        lastname: registerInfo.lastname,
        email: registerInfo.email,
        gender: registerInfo.gender, // some changes made here
        password: registerInfo.password,
        confirm_password: registerInfo.confirm_password,
      });
      console.log(response);
      if (response.status === 200) {
        // successful request stop the beat loader
        setDisplayBeatLoader(false);
        if (response.data.email === registerInfo.email) {
          // frontend email === backend email
          // make input fields empty
          setRegisterInfo({
            firstname: "",
            lastname: "",
            email: "",
            gender: "",
            password: "",
            confirm_password: "",
          });
          // Alert the sucesssfully registered user informatiion(email and password)
          setSuccessfullyRegisteredMsg({
            email: registerInfo.email,
            password: registerInfo.password,
          });
          //alert the successfully registered
          setDisplaySuccessfullyRegistered(true);

          // make the states for checking the errors empty
          setCheckEmailStatusError("");
          setCheckPasswordMatch("");

          //hide the registration form
          setHideRegstrationForm(true);
        } else {
          // go back to the top after when displayin ght error
          // window.scrollTo(0, 0);
          // Email check after a successful request
          setCheckEmailStatusError(response.data.msgEmail);
          // Password check after a successful request
          setCheckPasswordMatch(response.data.msgPassword);
          // display when there is an error
          setDisplayEmailOrPasswordError(true);
        }
      } else {
        // check the err if no success
      }
    } catch (err) {
      console.log(err);
      setCatchError("sorry, something went wrong!");
      setDisplayBeatLoader(false);
    }
  };

  // Handle the changes
  const handleChange = (e) => {
    const newRegisterInfo = { ...registerInfo };
    newRegisterInfo[e.target.id] = e.target.value; // research for understanding purposes
    setRegisterInfo(newRegisterInfo);
    console.log(newRegisterInfo);
  };

  return (
    <Fragment>
      <div className="signup-page-wrapper">
        <div className="signup-header-wrapper">
          <div className="signup-home-link">
            <HomeLink />
          </div>
        </div>
        {/* { displaying the user email and password required after sucessful registering} */}
        <div className="display-register-info-wrapper-1">
          {displaySuccessfullyRegistered ? (
            <div className="display-register-info-wrapper-2">
              <p className="success-message">
                Congragulations, you have been successfully registered!
              </p>
              <p>
                Your email is:{" "}
                <b className="registration-email">
                  {successfullyRegisteredMsg.email}
                </b>{" "}
                and your password is:{" "}
                <b className="registration-password">
                  {successfullyRegisteredMsg.password}
                </b>
              </p>
              <p>
                The above email and password will be required when logging into
                your account
              </p>
              <p>Click continue to login into your account</p>
              <div className="">
                <Link to="/login" className="link">
                  continue
                </Link>
              </div>
            </div>
          ) : null}
          {displayEmailOrPasswordError ? (
            <div className="registration-errors">
              <p className="check-email-status-error">
                {" "}
                {checkEmailStatusError}
              </p>
              <p className="check-password-match">{checkPasswordMatch}</p>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p className="first-display-on-sigup-page">
                {firsDisplayMessage}
              </p>
              <p style={{ color: "lightyellow" }}>{catchError}</p>
            </div>
          )}
        </div>
        <div className="beat-loader-component-signup">
          {displayBeatLoader ? <BeatLoader color="lightseagreen" /> : null}
        </div>
        {/* hiding the registraton form after successful registration */}

        {hideRegistrationForm ? null : (
          <div className="registration-form">
            <form onSubmit={(e) => submitRegisterInfo(e)}>
              <label>Firstname:</label>
              <br />
              <input
                type="text"
                id="firstname"
                className="signup-input-field"
                value={registerInfo.firstname}
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
                id="lastname"
                value={registerInfo.lastname}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              {/*display email exists */}
              <label>Email Address:</label>
              <br />
              <input
                type="email"
                className="signup-input-field"
                id="email"
                value={registerInfo.email}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              <label>Gender:</label>
              <br />
              <input
                type="text"
                id="gender"
                className="signup-input-field"
                value={registerInfo.gender}
                onChange={(e) => handleChange(e)}
                required
              />
              {/* Gender with only options */}

              {/* <label>
                <select
                  className="input-field"
                  onChange={(e) => handleGenderChange(e)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </label> */}

              {/* Another select trial */}
              {/* <Select options = {genders} onChange={handleGenderChange} className="input-field"/> */}
              {/* display for confirmation purposes */}
              {/* <h1> {genderOption}</h1> */}
              <br />
              <br />
              {/* display password don't match */}
              <label>Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="password"
                value={registerInfo.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              <label>Confirm Password:</label>
              <br />
              <input
                type="password"
                className="signup-input-field"
                id="confirm_password"
                value={registerInfo.confirm_password}
                onChange={(e) => handleChange(e)}
                required
              />
              <br />
              <br />
              <button className="signup-btn">Create</button>
            </form>
            <p>Do you already have an account?</p>
            <Link to="/login" className="link">
              login
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default SignUp;
