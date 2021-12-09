import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
// import { ClipLoader, PropagateLoader } from "react-spinners";
import { X } from "react-bootstrap-icons";

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
    subtitle.style.color = "black";
  };

  const tokenFromLocalStorage = localStorage.getItem("accessToken");
  const axiosApi = axios.create({
    // baseURL: "https://stockpile-backend.herokuapp.com/api",s
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
        // closeModal();
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
      <button onClick={openModal}>Edit title</button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Pile"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit pile</h2>
        <div onClick={closeModal} className="close-modal">
          <X size={20} />
        </div>
        {/* {displayClipLoader ? <ClipLoader color="red" /> : null} */}
        {/* <PropagateLoader color="red" /> */}
        <form>
          {/* <button onClick={closeModal}>close</button> */}
          {/* should an x sign to close the modal */}
          <input
            type="text"
            onChange={(e) => setPileTitle(e.target.value)}
            value={pileTitle}
          />
          <button onClick={updatePileTitle}>Edit</button>
        </form>
      </Modal>
    </div>
  );
};

export default EditPileTitle;
