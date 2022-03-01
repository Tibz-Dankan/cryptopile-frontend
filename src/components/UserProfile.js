import { useState, useEffect } from "react";
import axiosApiAuthorized from "./axiosAuthorized";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
  ChevronDown,
  ChevronUp,
  PersonCircle,
} from "react-bootstrap-icons";
import { ScaleLoader } from "react-spinners";
import "./../css/UserProfile.css";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showProfile, setShowProfile] = useState(false);
  const [showChevronDownIcon, setShowChevronDownIcon] = useState(true);
  const [showScaleLoader, setShowScaleLoader] = useState(false);

  // show user profile on click
  const showUserProfile = () => {
    switch (showProfile) {
      case true:
        setShowProfile(false);
        setShowChevronDownIcon(true);
        break;
      case false:
        setShowProfile(true);
        setShowChevronDownIcon(false);
        break;
      default:
    }
  };

  const getUserInfo = () => {
    setShowScaleLoader(true);
    axiosApiAuthorized
      .get(`/get-user-info/${userId}`)
      .then((res) => {
        setShowScaleLoader(false);
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUserVerificationStatus = () => {
    switch (userInfo.isverifiedemail) {
      case true:
        setIsUserVerified(true);
        break;
      case false:
        setIsUserVerified(false);
        break;
      default:
    }
    return isUserVerified;
  };

  // getting user info on loading and  after every update
  useEffect(() => {
    getUserInfo();
    return setUserInfo([]);
  }, []);

  return (
    <div className="user-profile-wrapper">
      <button className="btn-showing-profile" onClick={showUserProfile}>
        <p>Profile</p>
        {showChevronDownIcon ? (
          <ChevronDown
            size={15}
            style={{ marginLeft: "3px", fontWeight: "bold" }}
          />
        ) : (
          <ChevronUp
            size={15}
            style={{ marginLeft: "3px", fontWeight: "bold" }}
          />
        )}
      </button>
      {showProfile ? (
        <div className="user-info">
          {showScaleLoader ? <ScaleLoader color="hsl(180, 100%, 30%)" /> : null}
          {userInfo.map((info) => {
            return (
              <div key={info.userid} className="user-profile-details">
                <div className="default-profile-image">
                  {/* the icon below should be changed a link to allow upload of profile pictures */}
                  <PersonCircle size={60} color="hsl(0, 0%, 50%)" />
                </div>
                <p>Firstname: {info.firstname}</p>
                <p>Lastname: {info.lastname}</p>
                <p>Email: {info.email}</p>
                <div className="profile-verification-status">
                  <p>Status: </p>
                  {checkUserVerificationStatus ? (
                    <div className="verified-user">
                      Verified
                      <CheckCircleFill
                        color="hsl(120,100%, 70%)"
                        style={{ marginLeft: "3px" }}
                      />
                    </div>
                  ) : (
                    <div className="not-verified-user">
                      Not verified
                      <ExclamationTriangleFill color="hsl(60,100%,45%)" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
