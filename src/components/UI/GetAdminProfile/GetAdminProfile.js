import { useState, useEffect } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized.js";
import "./GetAdminProfile.css";
import AdminVerifyUser from "../AdminVerifyUser/AdminVerifyUser";
import AdminDeleteUser from "../AdminDeleteUser/AdminDeleteUser";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

const GetAdminProfile = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [adminProfile, setAdminProfile] = useState([]);
  const [adminVerificationStatus, setAdminVerificationStatus] = useState(false);
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const isVerified = true;

  //   get to get user accounts
  const getUserAccounts = async () => {
    try {
      if (!token) return;
      const response = await axiosApiAuthorized.get("/get-user-accounts");
      console.log(response);
      if (response.status === 200) {
        setUserAccounts(response.data);
        // some react spinner
      }
    } catch (error) {
      console.log(error);
      setShowCaughtError(true);
    }
  };

  const verificationStatus = (value) => {
    switch (value) {
      case true:
        setAdminVerificationStatus("Verified");
        break;
      case false:
        setAdminVerificationStatus("Not Verified");
        break;
      default:
    }
  };

  //   function to get admin profile details
  const getAdminProfile = async () => {
    try {
      if (!token) return;
      const response = await axiosApiAuthorized.get(
        `/get-admin-profile/${userId}`
      );
      console.log(response);
      if (response.status === 200) {
        setAdminProfile(response.data);
        verificationStatus(response.data[0].isverifiedemail);
      }
    } catch (error) {
      console.log(error);
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
            <p>
              {" "}
              status: {adminVerificationStatus}{" "}
              <ExclamationTriangleFill color="hsl(60,100%,45%)" />
            </p>
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
