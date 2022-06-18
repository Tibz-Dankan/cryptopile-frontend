/* eslint-disable no-unused-vars */
import React, { useState, useContext, Fragment } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext.js";
import "./EditUserProfile.css";
import { log } from "../../../utils/ConsoleLog";
import { BeatLoader } from "react-spinners";

const EditUserProfile = ({ userInfo }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let userId;
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailureMsg, setShowFailureMsg] = useState(false);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showMsgForSomeTime, setShowMsgForSomeTime] = useState(false);
  const [showBeatLoader, setShowBeatLoader] = useState(false);

  const showMsgForFiveSeconds = (boolean) => {
    setShowMsgForSomeTime(boolean);
    setTimeout(() => {
      setShowMsgForSomeTime(!boolean);
    }, 5000);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    log(firstName);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    log(lastName);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    log(email);
  };

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  const updateAccessTokenContextWhenNull = () => {
    if (!accessToken) {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  };
  updateAccessTokenContextWhenNull();

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      userId = userInfo[0].userId;
      if (userId === null) return;
      setShowBeatLoader(true);
      setShowSuccessMsg(false);
      setShowFailureMsg(false);
      setShowCatchError(false);
      log(firstName + " " + lastName + " " + email + " " + userId);
      const response = await axiosApiAuthorized.put(
        `/edit-user-profile/${userId}`,
        {
          firstName: firstName === "" ? userInfo[0].firstName : firstName,
          lastName: lastName === "" ? userInfo[0].lastName : lastName,
          email: email === "" ? userInfo[0].email : email,
        }
      );
      log(response);
      setShowBeatLoader(false);
      if (response.status === 200) {
        showMsgForFiveSeconds(true);
      }
    } catch (error) {
      setShowCatchError(false);
      setShowBeatLoader(false);
    }
  };

  return (
    <Fragment>
      <div className="edit-user-profile-wrapper">
        <div className="edit-profile-heading-and-alerts-wrapper">
          <h3 className="edit-profile-heading">Edit Profile</h3>
          <div className="edit-profile-alerts-wrapper">
            {showSuccessMsg && (
              <p className="edit-profile-success-msg">Successfully updated</p>
            )}
            {showFailureMsg && (
              <p className="edit-profile-failure-msg">Failed to update</p>
            )}
            {showCatchError && (
              <p className="edit-profile-catch-error">
                Sorry,something went wrong
              </p>
            )}
            {showBeatLoader && (
              <div className="edit-profile-beat-loader-wrapper">
                <BeatLoader color="hsl(180, 100%, 30%)" size={8} />
              </div>
            )}
          </div>
        </div>
        {userInfo.map((info) => {
          return (
            <form
              className="edit-profile-form"
              index={info.userId}
              onSubmit={(e) => updateUserProfile(e)}
            >
              <label className="edit-profile-label" htmlFor="FirstName">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e)}
                placeholder={info.firstName}
                className="edit-profile-input-field"
              />
              <label className="edit-profile-label" htmlFor="LastName">
                Last Name
              </label>
              <input
                type="text"
                className="edit-profile-input-field"
                value={lastName}
                onChange={(e) => handleLastNameChange(e)}
                placeholder={info.lastName}
              />
              <label className="edit-profile-label" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
                placeholder={info.email}
                className="edit-profile-input-field"
              />
              <button type="submit" className="edit-profile-btn">
                Update
              </button>
            </form>
          );
        })}
      </div>
    </Fragment>
  );
};

export default EditUserProfile;
