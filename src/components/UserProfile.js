import { useState, useEffect } from "react";
import axiosApiAuthorized from "./axiosAuthorized";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";
import "./../css/UserProfile.css";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const userId = localStorage.getItem("userId");

  const getUserInfo = () => {
    axiosApiAuthorized
      .get(`/get-user-info/${userId}`)
      .then((res) => {
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
  }, []);

  return (
    <div className="user-profile-wrapper">
      <div className="user-info">
        {/* <div className="user-profile-pic">profile pic here</div> */}
        {userInfo.map((info) => {
          return (
            <div key={info.userid} className="user-profile-details">
              <p>Firstname: {info.firstname}</p>
              <p>Lastname: {info.lastname}</p>
              <p>Email: {info.email}</p>
            </div>
          );
        })}
        <div className="profile-verification-status">
          <p>Status: </p>
          {checkUserVerificationStatus ? (
            <div className="verified-user">
              Verified
              <CheckCircleFill color="hsl(120,100%, 70%)" />
            </div>
          ) : (
            <div className="not-verified-user">
              Not verified
              <ExclamationTriangleFill color="hsl(60,100%,45%)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
