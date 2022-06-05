import { useState, useEffect } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized.js";
import "./GetAdminProfile.css";
import AdminVerifyUser from "../AdminVerifyUser/AdminVerifyUser";
import AdminDeleteUser from "../AdminDeleteUser/AdminDeleteUser";
import { log } from "../../../utils/ConsoleLog.js";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";
import jwt_decode from "jwt-decode";

const GetAdminProfile = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [adminProfile, setAdminProfile] = useState([]);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const isVerified = true;

  //   get to get user accounts
  const getUserAccounts = async () => {
    try {
      if (!token) return;
      const response = await axiosApiAuthorized.get("/get-user-accounts");
      log(response);
      if (response.status === 200) {
        setUserAccounts(response.data);
        // some react spinner
      }
    } catch (error) {
      log(error);
      setShowCaughtError(true);
    }
  };

  // jwt decode
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  const userId = decodedUserInfo.userId;

  //   function to get admin profile details
  const getAdminProfile = async () => {
    try {
      if (!token) return;
      const response = await axiosApiAuthorized.get(
        `/get-admin-profile/${userId}`
      );
      log(response);
      if (response.status === 200) {
        setAdminProfile(response.data);
        setIsAdminVerified(response.data[0].isverifiedemail);
      }
    } catch (error) {
      log(error);
    }
  };

  //   calling methods on page loading
  useEffect(() => {
    getUserAccounts();
    getAdminProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin-wrapper">
      {showCaughtError && <p>sorry something went wrong</p>}
      {/* Admin profile*/}
      {adminProfile.map((admin) => {
        return (
          <div className="admin-profile" key={admin.userid}>
            <h3>Admin profile</h3>
            <p>
              Name: {admin.firstname} {admin.lastname}
            </p>
            <p> Email: {admin.email}</p>
            <p> Role: {admin.roles}</p>
            {isAdminVerified ? (
              <p>
                {" "}
                status: {<span>Verified</span>}{" "}
                <CheckCircleFill color="hsl(120,100%, 60%)" />
              </p>
            ) : (
              <p>
                {" "}
                status: {<span>Not Verified</span>}{" "}
                <ExclamationTriangleFill color="hsl(60,100%,45%)" />
              </p>
            )}
          </div>
        );
      })}
      {/* user accounts */}
      <table className="user-account-table">
        <tbody>
          <tr>
            <th>User ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Verification Status</th>
            <th>Verify User</th>
            <th>Delete User</th>
          </tr>
          {userAccounts.map((accounts) => {
            return (
              <tr key={accounts.userid}>
                <td>{accounts.userid}</td>
                <td>{accounts.firstname}</td>
                <td>{accounts.lastname}</td>
                <td>{accounts.email}</td>
                <td>
                  {isVerified === accounts.isverifiedemail ? (
                    <div className="verified-user">
                      Verified
                      <CheckCircleFill color="hsl(120,100%, 60%)" />
                    </div>
                  ) : (
                    <div className="not-verified-user">
                      Not verified
                      <ExclamationTriangleFill color="hsl(60,100%,45%)" />
                    </div>
                  )}
                </td>
                <td id="account-id">
                  {<AdminVerifyUser account={accounts} />}
                </td>
                <td>{<AdminDeleteUser account={accounts} />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* upload images by admin here */}
    </div>
  );
};
export default GetAdminProfile;
