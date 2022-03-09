import axiosApiAuthorized from "./axiosAuthorized";
import React, { useState } from "react";
import Modal from "react-modal";
// import { ClipLoader, PropagateLoader } from "react-spinners";
import { FlagFill, X } from "react-bootstrap-icons";
import "./../css/EditTodoDescription.css";

// More features to be added here
// Look for appropriate react spinners for react modal

const EditTodoDescription = ({ todo }) => {
  const [todoDescription, setTodoDescription] = useState([todo.description]);
  const [todoChangeMsg, setTodoChangeMsg] = useState("");
  const [showTodoChangeMsg, setShowTodoChangeMsg] = useState(false);

  const dateOfUpdate = new Date().toDateString();
  const timeOfUpdate = new Date().toLocaleTimeString();

  // console.log(todoTitle);
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
    localStorage.setItem("description", todo.description);
    hasTodoChanged();
    setTodoChangeMsg("");
  };
  // close modal function
  const closeModal = () => {
    setIsOpenModal(false);
    localStorage.removeItem("description");
    setTodoChangeMsg("");
  };
  // On opening the modal function
  const afterOpenModal = () => {
    // subtitle.style.color = "black";
  };

  // function to check for changes in the todos before making a request to the backend
  const hasTodoChanged = () => {
    const originalTodoDescription = localStorage.getItem("description");
    // eslint-disable-next-line eqeqeq
    if (todoDescription != originalTodoDescription) {
      setShowTodoChangeMsg(false);
      return true;
    } else {
      setShowTodoChangeMsg(true);
      return false;
    }
  };

  // function to disable a button
  const disableButton = () => {
    document.getElementById("button").disabled = true;
  };

  // function to enable a button
  const enableButton = () => {
    document.getElementById("button").disabled = false;
  };

  // function to update data in the database
  const updateTodoDescription = async (e) => {
    e.preventDefault();
    try {
      if (hasTodoChanged()) {
        disableButton();
        const response = await axiosApiAuthorized.put(
          `/api/edit-todo-description/${todo.todoid}`,
          {
            description: todoDescription,
            dateOfUpdate: dateOfUpdate,
            timeOfUpdate: timeOfUpdate,
          }
        );
        if (response.status === 200) {
          enableButton();
          // And end the close modal
          closeModal();
        }
        // console.log(response);
      } else {
        setTodoChangeMsg("can't update unchanged todo!");
      }
    } catch (error) {
      enableButton();
      console.log(error);
    }
  };

  // binding the modal to the app
  //   Modal.setAppElement("#Todo-description-id");
  Modal.setAppElement(document.getElementById("todo-description-id")); // some bugs here
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
        contentLabel="Edit Todo"
      >
        <form className="edit-form">
          <h4>Edit Todo Description</h4>
          <div onClick={closeModal} className="close-modal">
            <X size={30} />
          </div>
          <div>
            {showTodoChangeMsg ? (
              <p className="todo-change-msg"> {todoChangeMsg}</p>
            ) : null}
          </div>
          <textarea
            className="textarea"
            type="text"
            onChange={(e) => setTodoDescription(e.target.value)}
            value={todoDescription}
          />
          <button
            className="edit-button edit-button-2"
            id="button"
            onClick={updateTodoDescription}
          >
            Edit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditTodoDescription;
