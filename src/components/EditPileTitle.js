import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
// import { ClipLoader, PropagateLoader } from "react-spinners";
import { X } from "react-bootstrap-icons";
import "./../css/EditPileTitle.css";

// More features to be added here
// Look for appropriate react spinners for react modal

const EditPileTitle = ({ pile }) => {
  const [pileTitle, setPileTitle] = useState([pile.title]);
  // const [displayClipLoader, setDisplayClipLoader] = useState(false);

  // console.log(pileTitle);
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
      width: "50%",
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

  const tokenFromLocalStorage = localStorage.getItem("accessToken");
  const axiosApi = axios.create({
    // baseURL: "https://stockpile-backend.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: "Bearer " + tokenFromLocalStorage,
    },
  });
  // function to update data in the database
  const updatePileTitle = async (e) => {
    e.preventDefault();
    // start the spinner here
    // setDisplayClipLoader(true);
    try {
      console.log(pile.pile_id);
      const response = await axiosApi.put(`/edit-pile-title/${pile.pile_id}`, {
        title: pileTitle,
      });
      if (response.status === 200) {
        // stop the spinner
        // setDisplayClipLoader(false);
        // And end the close modal
        closeModal();
        // also refresh automatically the whole page for a user to visualize the changes
      } else {
        // when some thing goes wrong
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // binding the modal to the app
  //   Modal.setAppElement("#pile-title-id");
  Modal.setAppElement(document.getElementById("pile-title-id")); // some bugs here
  return (
    <div>
      <button className="edit-button edit-button-1" onClick={openModal}>
        edit
      </button>
      <div className="modal-wrapper">
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Edit Pile Title"
        >
          {/* {displayClipLoader ? <ClipLoader color="red" /> : null} */}
          {/* <PropagateLoader color="red" /> */}
          <form className="edit-form">
            <h4>Edit Pile Title</h4>
            <div onClick={closeModal} className="close-modal">
              <X size={30} />
            </div>
            <textarea
              className="textarea"
              type="text"
              onChange={(e) => setPileTitle(e.target.value)}
              value={pileTitle}
            />
            <button
              className="edit-button edit-button-2"
              onClick={updatePileTitle}
            >
              Edit
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default EditPileTitle;
