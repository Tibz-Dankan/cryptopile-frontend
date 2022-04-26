import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import "./AdminDeleteUser.css";

const AdminDeleteUser = ({ account }) => {
  // const userAccount = [account];
  const [userAccountDeleteMsg, setUserAccountDeleteMsg] = useState(false);

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

  const showUserAccountDeleteMsg = () => {
    setUserAccountDeleteMsg(true);
    setTimeout(() => {
      setUserAccountDeleteMsg(false);
    }, 2000);
  };

  const adminDeleteUserAccount = async (e) => {
    e.preventDefault();
    try {
      const userId = account.userid;
      const response = await axiosApiAuthorized.delete(
        `/admin-delete-user/${userId}`
      );
      if (response.status === 200) {
        closeModal();
        showUserAccountDeleteMsg();
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
      {userAccountDeleteMsg ? <p>User account deleted</p> : null}
      <button className="delete-user-button-1" onClick={openModal}>
        Delete
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete User"
      >
        <div className="delete-user">
          <h4>Delete User With id: {account.userid}</h4>
          <div onClick={closeModal} className="close-modal">
            <X size={30} />
          </div>
          <div className="user-info">
            <p>{account.firstname}</p>
            <p>{account.lastname}</p>
            <p>{account.email}</p>
          </div>
          <button
            className="delete-user-button Delete-user-button-2"
            onClick={adminDeleteUserAccount}
          >
            Delete User
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDeleteUser;
