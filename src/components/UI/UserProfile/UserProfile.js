/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
  PersonCircle,
} from "react-bootstrap-icons";
import { ScaleLoader } from "react-spinners";
import jwt_decode from "jwt-decode";
import { log } from "../../../utils/ConsoleLog";
import "./UserProfile.css";
import UploadProfileImage from "../UploadProfileImage/UploadProfileImage";
import EditUserProfile from "../EditUserProfile/EditUserProfile";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";
import CustomHeader from "../../layouts/CustomHeader/CustomHeader";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const isUserVerified = true;
  const [showScaleLoader, setShowScaleLoader] = useState(false);
  const [showProfileImageIcon, setShowProfileImageIcon] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showUploadProfileImageForm, setShowUploadProfileImageForm] =
    useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const showAndHideEditForm = () => {
    switch (showEditProfileForm) {
      case true:
        setShowEditProfileForm(false);
        break;
      case false:
        setShowEditProfileForm(true);
        break;
      default:
    }
  };

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

  // TODO: Add user role to http request fetching user info and not decoding from the token

  // decode jwt token with user info
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  let decodedUserInfo, userId, userRole;
  const decodeJwtToken = () => {
    if (!userInfoToken) return;
    decodedUserInfo = jwt_decode(userInfoToken);
    userId = decodedUserInfo.userId;
    userRole = decodedUserInfo.role;
  };
  decodeJwtToken();

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  useEffect(async () => {
    await setAccessToken(sessionStorage.getItem("accessToken"));
  }, []);

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const getUserInfo = () => {
    if (!userInfoToken) return;
    setShowScaleLoader(true);
    axiosApiAuthorized
      .get(`/get-user-info/${userId}`)
      .then((response) => {
        log(response);
        log(response.data[0]); // to be removed
        log(response.data); // to be removed
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
      })
      .catch((error) => {
        log(error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Fragment>
      <CustomHeader sectionName={"Profile"} />
      {isLoggedIn ? (
        <>
          <div className="user-profile-wrapper">
            <div className="user-profile-info-wrapper">
              {showScaleLoader ? (
                <ScaleLoader color="hsl(180, 100%, 30%)" />
              ) : null}
              {userInfo.map((info) => {
                return (
                  <div key={info.userId} className="user-profile-details">
                    {showUploadProfileImageForm && (
                      <div>
                        <UploadProfileImage />
                      </div>
                    )}
                    <div className="user-name-and-image">
                      <div className="user-image">
                        {showProfileImageIcon ? (
                          <div
                            className="default-profile-image tooltip"
                            onClick={() => showImageUploadForm()}
                          >
                            <p className="tooltiptext">Upload Profile Image</p>
                            <PersonCircle size={60} color="hsl(0, 0%, 60%)" />
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
                      </div>
                      <p className="user-name">
                        {info.firstName} {info.lastName}
                      </p>
                      <div className="profile-verification-status">
                        {isUserVerified === info.isverifiedemail ? (
                          <div className="verified-user">
                            <p className="verification-status">Verified</p>
                            <CheckCircleFill
                              color="hsl(120,100%, 70%)"
                              style={{
                                marginLeft: "3px",
                                marginTop: "0px",
                                padding: " 0.5em 0.2em",
                              }}
                            />
                          </div>
                        ) : (
                          <div className="not-verified-user">
                            <p className="verification-status">Not verified</p>
                            <ExclamationTriangleFill
                              color="hsl(60,100%,45%)"
                              style={{
                                marginLeft: "3px",
                                marginTop: "0px",
                                padding: " 0.5em 0em",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="user-role-and-email-wrapper">
                      <p>
                        {" "}
                        <span className="user-email-label">Email:</span>{" "}
                        {info.email}
                      </p>
                      <p>
                        <span className="user-role-label">Role: </span>{" "}
                        {userRole}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="edit-profile-button-wrapper">
                <button
                  className="edit-profile-btn"
                  onClick={() => showAndHideEditForm()}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            {showEditProfileForm && (
              <div className="edit-user-info-wrapper">
                <EditUserProfile userInfo={userInfo} />
              </div>
            )}
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </Fragment>
  );
};

export default UserProfile;
