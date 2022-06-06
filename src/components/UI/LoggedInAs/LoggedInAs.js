import React, { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";
import { ChevronDown, ChevronUp, PersonCircle } from "react-bootstrap-icons";
import Logout from "../Logout/Logout";
// import { log } from "../../../utils/ConsoleLog";
import "./LoggedInAs.css";
const LoggedInAs = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [showUserImage, setShowUserImage] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showChevronUpOrChevronDown, setShowChevronUpOrChevronDown] =
    useState(false);

  const userInfo = () => {
    const userInfoToken = sessionStorage.getItem("userInfoToken");
    if (!userInfoToken) return;
    const decodedUserInfo = jwt_decode(userInfoToken);
    setUserFirstName(decodedUserInfo.firstName);
    setUserLastName(decodedUserInfo.lastName);
    setUserImageUrl(decodedUserInfo.imageUrl);
    setShowUserInfo(true);
    if (decodedUserInfo.imageUrl != null) {
      setShowUserImage(true);
    }
  };
  const showAndHideLogOut = () => {
    switch (showLogOut) {
      case true:
        setShowLogOut(false);
        setShowChevronUpOrChevronDown(false);
        break;
      case false:
        setShowLogOut(true);
        setShowChevronUpOrChevronDown(true);
        break;
      default:
    }
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <Fragment>
      {showUserInfo && (
        <div className="logged-in-as-wrapper">
          {showUserImage ? (
            <div className="logged-in-user-image">
              <img src={userImageUrl} alt="user pic" />
            </div>
          ) : (
            <PersonCircle className="logged-in-Person-circle" size={40} />
          )}
          <p className="logged-in-username">
            {userFirstName} {userLastName}
          </p>
          <div onClick={() => showAndHideLogOut()}>
            {showChevronUpOrChevronDown ? (
              <ChevronUp className="chevron-down" />
            ) : (
              <ChevronDown className="chevron-down" />
            )}
          </div>
          {showLogOut && (
            <div className="logged-in-logout-wrapper">
              <Logout />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default LoggedInAs;
