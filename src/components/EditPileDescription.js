import axiosApiAuthorized from "./axiosAuthorized";
import React, { useState } from "react";
import Modal from "react-modal";
// import { ClipLoader, PropagateLoader } from "react-spinners";
import { X } from "react-bootstrap-icons";
import "./../css/EditPileDescription.css";

// More features to be added here
// Look for appropriate react spinners for react modal

const EditPileDescription = ({ pile }) => {
  const [pileDescription, setPileDescription] = useState([pile.description]);

  // console.log(pileTitle);
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

  // function to update data in the database
  const updatePileDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosApiAuthorized.put(
        `/api/edit-pile-description/${pile.todoid}`,
        {
          description: pileDescription,
        }
      );
      if (response.status === 200) {
        // And end the close modal
        closeModal();
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // binding the modal to the app
  //   Modal.setAppElement("#pile-description-id");
  Modal.setAppElement(document.getElementById("pile-description-id")); // some bugs here
  return (
    <div>
      <button className="edit-button edit-button-1" onClick={openModal}>
        Edit
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Pile"
      >
        <form className="edit-form">
          <h4>Edit Todo Description</h4>
          <div onClick={closeModal} className="close-modal">
            <X size={30} />
          </div>
          <textarea
            className="textarea"
            type="text"
            onChange={(e) => setPileDescription(e.target.value)}
            value={pileDescription}
          />
          <button
            className="edit-button edit-button-2"
            onClick={updatePileDescription}
          >
            Edit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditPileDescription;
