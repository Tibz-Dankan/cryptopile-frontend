/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import axiosApiAuthorized from "../../../AxiosApi/axiosAuthorized";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
  ChevronDown,
  ChevronUp,
  PersonCircle,
} from "react-bootstrap-icons";
import { ScaleLoader } from "react-spinners";
import "./UserProfile.css";
import UploadProfileImage from "../UploadProfileImage/UploadProfileImage";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showProfile, setShowProfile] = useState(false);
  const [showChevronDownIcon, setShowChevronDownIcon] = useState(true);
  const [showScaleLoader, setShowScaleLoader] = useState(false);
  const [showProfileImageIcon, setShowProfileImageIcon] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showUploadProfileImageForm, setShowUploadProfileImageForm] =
    useState(false);

  // show the form  for uploading user profile image
  const showImageUploadForm = () => {
    switch (showUploadProfileImageForm) {
      case true:
        setShowUploadProfileImageForm(false);
        break;
      case false:
        setShowUploadProfileImageForm(true);
        break;
      default:
    }
  };

  // show user profile on click
  const showUserProfile = () => {
    switch (showProfile) {
      case true:
        setShowProfile(false);
        setShowChevronDownIcon(true);
        setUserInfo([]);
        break;
      case false:
        getUserInfo(); //getting user profile details
        setShowProfile(true);
        setShowChevronDownIcon(false);
        break;
      default:
    }
  };

  const isProfileImageUrlNull = (showProfileImageIcon, imageUrl) => {
    switch (showProfileImageIcon) {
      case true:
        setShowProfileImageIcon(true);
        break;
      case false:
        setShowProfileImageIcon(false);
        setImageUrl(imageUrl);
        break;
      default:
    }
  };

  const getUserInfo = () => {
    setShowScaleLoader(true);
    axiosApiAuthorized
      .get(`/get-user-info/${userId}`)
      .then((response) => {
        setShowScaleLoader(false);
        setUserInfo(response.data);
        const imageUrlFromDatabase = response.data[0].imageUrl;
        isProfileImageUrlNull(
          imageUrlFromDatabase == null,
          imageUrlFromDatabase
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUserVerificationStatus = () => {
    switch (userInfo[0].isverifiedemail) {
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
              <div key={info.userId} className="user-profile-details">
                {showUploadProfileImageForm ? (
                  <div>
                    <UploadProfileImage />
                  </div>
                ) : null}
                {showProfileImageIcon ? (
                  <div
                    className="default-profile-image tooltip"
                    onClick={showImageUploadForm}
                  >
                    <p className="tooltiptext">Upload Profile Image</p>
                    <PersonCircle size={60} color="hsl(0, 0%, 50%)" />
                  </div>
                ) : (
                  <div className="user-profile-image-wrapper">
                    <img
                      src={imageUrl}
                      className="user-profile-image"
                      alt="Profile Pic"
                    />
                  </div>
                )}
                <p>Firstname: {info.firstName}</p>
                <p>Lastname: {info.lastName}</p>
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
