/* eslint-disable no-unused-vars */
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { TodoChangeContext } from "../../../context/TodoChangeContext/TodoChangeContext";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { HashLoader } from "react-spinners";
import { X } from "react-bootstrap-icons";
import "./EditTodoDescription.css";

const EditTodoDescription = ({ todo }) => {
  const [todoDescription, setTodoDescription] = useState([todo.description]);
  const [todoChangeMsg, setTodoChangeMsg] = useState("");
  const [showTodoChangeMsg, setShowTodoChangeMsg] = useState(false);
  const [showHashLoader, setShowHashLoader] = useState(false);

  const dateOfUpdate = new Date().toDateString();
  const timeOfUpdate = new Date().toLocaleTimeString();

  const [hasTodoChanged, setHasTodoChanged] = useContext(TodoChangeContext);

  const TodoChanged = (value, setValue) => {
    switch (value) {
      case true:
        setValue(false);
        break;
      case false:
        setValue(true);
        break;
      default:
    }
  };

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

  const openModal = () => {
    setIsOpenModal(true);
    sessionStorage.setItem("description", todo.description);
    hasATodoChanged();
    setTodoChangeMsg("");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    sessionStorage.removeItem("description");
    setTodoChangeMsg("");
  };
  // On opening the modal function
  const afterOpenModal = () => {
    // subtitle.style.color = "black";
  };

  // function to check for changes in the todos before making a request to the backend
  const hasATodoChanged = () => {
    const originalTodoDescription = sessionStorage.getItem("description");
    // eslint-disable-next-line eqeqeq
    if (todoDescription != originalTodoDescription) {
      setShowTodoChangeMsg(false);
      return true;
    } else {
      setShowTodoChangeMsg(true);
      return false;
    }
  };

  // function to update data in the database
  const updateTodoDescription = async (e) => {
    e.preventDefault();
    try {
      if (hasATodoChanged()) {
        disableButton("button");
        setShowHashLoader(true);
        const response = await axiosApiAuthorized.put(
          `/api/edit-todo-description/${todo.todoid}`,
          {
            description: todoDescription,
            dateOfUpdate: dateOfUpdate,
            timeOfUpdate: timeOfUpdate,
          }
        );
        if (response.status === 200) {
          enableButton("button");
          setShowHashLoader(false);
          closeModal();
          TodoChanged(hasTodoChanged, setHasTodoChanged);
        }
      } else {
        setTodoChangeMsg("Can't update unchanged todo!");
      }
    } catch (error) {
      enableButton("button");
      console.log(error);
    }
  };

  // binding the modal to the app
  //   Modal.setAppElement("#Todo-description-id");
  Modal.setAppElement(document.getElementById("todo-description-id"));
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
          {showHashLoader ? (
            <div className="hash-loader">
              <HashLoader color="hsl(180, 100%, 50%)" />
            </div>
          ) : null}
          {/* {showTodoChangeMsg ? (
            <div className="todo-change-msg-wrapper">
              <p className="todo-change-msg"> {todoChangeMsg}</p>
            </div>
          ) : null} */}
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
