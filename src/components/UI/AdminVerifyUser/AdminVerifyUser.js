import axiosApiAuthorized from "./../../../constants/AxiosApi/axiosAuthorized";
import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import "./AdminVerifyUser.css";

const AdminVerifyUser = ({ account }) => {
  //   const [userAccount, setUserAccount] = useState([account]);
  // const userAccount = [account];
  const [userAccountVerified, setUserAccountVerified] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  // let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
      width: "60%",
    },
  };
  const [isModalOpen, setIsOpenModal] = useState(false);
  // open modal function
  const openModal = () => {
    setIsOpenModal(true);
  };
  // close modal function
  const closeModal = () => {
    setIsOpenModal(false);
  };
  // On opening the modal function
  const afterOpenModal = () => {
    // subtitle.style.color = "black";
  };

  const checkUserVerificationStatus = () => {
    switch (account.isverifiedemail) {
      case true:
        setIsUserVerified(false);
        break;
      case false:
        setIsUserVerified(true);
        break;
      default:
    }
    return isUserVerified;
  };

  const showUserAccountVerifiedMsg = () => {
    setUserAccountVerified(true);
    setTimeout(() => {
      setUserAccountVerified(false);
    }, 2000);
  };

  const adminVerifyUserAccount = async (e) => {
    e.preventDefault();
    try {
      const userId = account.userid;
      const response = await axiosApiAuthorized.put(
        `/admin-verify-user/${userId}`,
        {
          firstName: account.firstname,
        }
      );
      if (response.status === 200) {
        closeModal();
        showUserAccountVerifiedMsg();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // binding the modal to the app
  Modal.setAppElement(document.getElementById("account-id"));
  return (
    <div>
      {userAccountVerified ? (
        <p className="user-account-verify-msg">
          User account successfully verified
        </p>
      ) : null}
      <div className="verify-user-button-1-wrapper">
        {checkUserVerificationStatus ? (
          <p className="user-verify-msg">No Action</p>
        ) : (
          <button className="admin-verify-user-button-1" onClick={openModal}>
            Verify
          </button>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Verify User"
      >
        <div className="verify-user">
          <h4>Verify User With id: {account.userid}</h4>
          <div onClick={closeModal} className="close-modal">
            <X size={30} />
          </div>
          <div className="user-info">
            <p>{account.firstname}</p>
            <p>{account.lastname}</p>
            <p>{account.email}</p>
          </div>

          <button
            className="verify-user-button verify-user-button-2"
            onClick={adminVerifyUserAccount}
          >
            Verify User
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVerifyUser;