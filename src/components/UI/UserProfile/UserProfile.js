/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
  ChevronDown,
  ChevronUp,
  PersonCircle,
} from "react-bootstrap-icons";
import { ScaleLoader } from "react-spinners";
import jwt_decode from "jwt-decode";
import { log } from "../../../utils/ConsoleLog";
import "./UserProfile.css";
import UploadProfileImage from "../UploadProfileImage/UploadProfileImage";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const isUserVerified = true;
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

  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  const userId = decodedUserInfo.userId;

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

  const getUserInfo = () => {
    setShowScaleLoader(true);
    axiosApiAuthorized
      .get(`/get-user-info/${userId}`)
      .then((response) => {
        setShowScaleLoader(false);
        if (response.data[0] == null || response.data[0] === "undefined") {
          return;
        }
        setUserInfo(response.data);
        const imageUrlFromDatabase = response.data[0].imageUrl;
        isProfileImageUrlNull(
          imageUrlFromDatabase == null,
          imageUrlFromDatabase
        );
        log(response);
      })
      .catch((error) => {
        log(error);
      });
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
      {showProfile && (
        <div className="user-info">
          {showScaleLoader ? <ScaleLoader color="hsl(180, 100%, 30%)" /> : null}
          {userInfo.map((info) => {
            return (
              <div key={info.userId} className="user-profile-details">
                {showUploadProfileImageForm && (
                  <div>
                    <UploadProfileImage />
                  </div>
                )}
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
                <p>
                  Name: {info.firstName} {info.lastName}
                </p>
                <p>Email: {info.email}</p>
                <div className="profile-verification-status">
                  <p>Status: </p>
                  {isUserVerified === info.isverifiedemail ? (
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
      )}
    </div>
  );
};

export default UserProfile;
