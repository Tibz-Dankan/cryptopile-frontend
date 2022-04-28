/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import "./FeatureUnderMaintenance.css";

const FeatureUnderMaintenance = ({ targetInfo }) => {
  // the modal state
  const [isModalOpen, setIsOpenModal] = useState(false);

  const openAndCloseModal = () => {
    openModal();
    setTimeout(() => {
      closeModal();
    }, 5000);
  };
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
  };
  // onAfterOpen modal
  const afterOpenModal = () => {
    // subtitle.style.color = "green";
  };
  // the modal element
  Modal.setAppElement(document.getElementsByClassName("user-todo"));

  return (
    <div>
      <div className="target-feature" onClick={openAndCloseModal}>
        <p>{targetInfo}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Feature Under Maintenance"
      >
        <div className="Feature-under-maintenance-modal-wrapper">
          <h4 className="feature-msg">
            This Feature is under maintenance by the Technical Team
          </h4>
          <div
            className="Feature-under-maintenance-close-modal"
            onClick={closeModal}
          >
            <X size={25} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeatureUnderMaintenance;
