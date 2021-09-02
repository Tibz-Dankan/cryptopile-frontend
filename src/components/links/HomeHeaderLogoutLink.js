import React, { useState } from "react";
import LogoutLink from "./LogoutLink";
// to be done later
const HomeHeaderLogoutLink = () => {
  const [showLogoutLink, setShowLogoutLink] = useState(false);
  if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
    //show the logout link
    setShowLogoutLink(true);
  }
  return (
    <div className="home-header-logout-link">
      {showLogoutLink ? (
        <div>
          <LogoutLink />
        </div>
      ) : null}
    </div>
  );
};

export default HomeHeaderLogoutLink;
