import React, { useEffect, useState } from "react";
import "./NotLoggedIn.css";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  let history = useHistory();
  const redirectToPreviousPath = () => {
    history.goBack();
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") === null) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // the modal state

  // let subtitle;
  // styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
      width: "40%",
    },
  };
  // open modal
  const openModal = () => {
    setIsOpenModal(true);
  };
  // close modal
  const closeModal = () => {
    setIsOpenModal(false);
    redirectToPreviousPath();
  };
  // onAfterOpen modal
  const afterOpenModal = () => {
    // subtitle.style.color = "green";
  };
  // the modal element
  Modal.setAppElement(document.getElementsByClassName("user-todo"));

  return (
    <div className="not-logged-in-wrapper">
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Not logged In"
      >
        <div className="not-logged-in-wrapper">
          <h4 className="not-logged-in-heading">You are not Logged In</h4>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="not-logged-login-link">
              Log In
            </Link>
          </p>
          <p>
            Is this your first time here?{" "}
            <Link to="/signup" className="not-logged-signup-link">
              Sign Up
            </Link>
          </p>
          <div className="not-logged-in-close-modal" onClick={closeModal}>
            <X size={25} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotLoggedIn;
