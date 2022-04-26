/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { TodoChangeContext } from "../../../context/TodoChangeContext/TodoChangeContext";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import "./DeleteTodo.css";

const DeleteTodo = ({ todo }) => {
  // the modal state
  const [isModalOpen, setIsOpenModal] = useState(false);

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

  const [todoId, setTodoId] = useState(todo.todoid);

  // function to delete the todo
  const deleteTodo = async () => {
    try {
      disableButton("button");
      const response = await axiosApiAuthorized.delete(
        `api/delete-todo/${todoId}`
      );
      if (response.status === 200) {
        // And end the close modal
        closeModal();
        enableButton("button");
        // also refresh automatically the whole page for a user to visualize the changes
        TodoChanged(hasTodoChanged, setHasTodoChanged);
      } else {
        // when some thing goes wrong
      }
      console.log(response);
    } catch (error) {
      enableButton("button");
      console.log(error);
      // some state to capture error and alert the user when there is a problem on the server
    }
  };

  return (
    <div>
      <button className="delete-button delete-button-1" onClick={openModal}>
        Delete
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Todo"
      >
        <div className="modal-wrapper">
          <h4>This will be deleted permanently</h4>
          <div className="close-modal" onClick={closeModal}>
            <X size={30} />
          </div>
          <button
            className="delete-button delete-button-2"
            id="button"
            onClick={deleteTodo}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTodo;
