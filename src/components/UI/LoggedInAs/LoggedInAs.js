import React, { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";

const LoggedInAs = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(false);

  const userInfo = () => {
    const userInfoToken = sessionStorage.getItem("userInfoToken");
    if (!userInfoToken) return;
    const decodedUserInfo = jwt_decode(userInfoToken);
    setUserFirstName(decodedUserInfo.firstName);
    setUserLastName(decodedUserInfo.lastName);
    setShowUserInfo(true);
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <Fragment>
      <div className="logged-in-as-wrapper">
        {showUserInfo && (
          <p style={{ color: "hsl(0, 100%, 100%)", textAlign: "center" }}>
            You are logged in as {userFirstName} {userLastName}
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default LoggedInAs;
