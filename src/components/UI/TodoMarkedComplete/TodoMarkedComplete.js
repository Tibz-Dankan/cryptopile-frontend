/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { TodoChangeContext } from "../../../context/TodoChangeContext/TodoChangeContext";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import { log } from "../../../utils/ConsoleLog";
import Modal from "react-modal";
import { X } from "react-bootstrap-icons";
import "./TodoMarkedComplete.css";

const TodoMarkedComplete = ({ todo }) => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [showTodoMarkedCompleteStatus, setShowTodoMarkedCompleteStatus] =
    useState(false);
  const [showFailedToMarkTodo, setShowFailedToMarkTodo] = useState(false);
  const [hasTodoChanged, setHasTodoChanged] = useContext(TodoChangeContext);
  const [todoId, setTodoId] = useState(todo.todoid);
  const isBoxChecked = true;

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

  const todoCompletionStatusFromDb = todo.todomarkedcomplete;
  const showTodoMarked = !todoCompletionStatusFromDb;

  let todoMarkedComplete;
  const getTodoCompletionStatusAndChangeIt = () => {
    todoMarkedComplete = !todoCompletionStatusFromDb;
    log(" The boolean value of the check box: " + todoMarkedComplete);
    return true;
  };

  const submitCurrentCheckBoxStatus = () => {
    getTodoCompletionStatusAndChangeIt() && submitTodoCompletionStatus();
  };

  const openAndCloseModal = () => {
    openModal();
    setTimeout(() => {
      closeModal();
      TodoChanged(hasTodoChanged, setHasTodoChanged);
    }, 3000);
  };

  const submitTodoCompletionStatus = async () => {
    try {
      log(`The todo id is :  ${todoId}`); // to be removed
      disableButton("check-box");
      const response = await axiosApiAuthorized.put(
        `api/mark-todo-complete/${todoId}`,
        {
          todoMarkedComplete: todoMarkedComplete,
        }
      );
      if (response.status === 200) {
        setShowTodoMarkedCompleteStatus(true);
        enableButton("check-box");
        openAndCloseModal();
      }
      log(response.data.rows);
    } catch (error) {
      openAndCloseModal();
      setShowFailedToMarkTodo(true);
      enableButton("check-box");
      log(error);
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
  // Modal.setAppElement(document.getElementsByClassName("user-todo"));
  Modal.setAppElement(document.getElementById("todo-description-id"));

  return (
    <div>
      <form className="todo-marked-complete-form">
        {isBoxChecked === todoCompletionStatusFromDb ? (
          <input
            type="checkbox"
            id="check-box"
            value={todoMarkedComplete}
            onClick={() => submitCurrentCheckBoxStatus()}
            defaultChecked
          />
        ) : (
          <input
            type="checkbox"
            id="check-box"
            value={todoMarkedComplete}
            onClick={() => submitCurrentCheckBoxStatus()}
          />
        )}
      </form>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Todo Completed"
      >
        <div className="modal-wrapper">
          {showTodoMarkedCompleteStatus &&
            (showTodoMarked ? (
              <p className="todo-marked-complete-successfully">
                Todo Marked successfully
              </p>
            ) : (
              <p className="todo-marked-complete-successfully">
                Todo Unmarked successfully
              </p>
            ))}
          {showFailedToMarkTodo && (
            <p className="failed-to-mark-todo">Failed to mark as complete</p>
          )}
          <div className="close-modal" onClick={closeModal}>
            <X size={30} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoMarkedComplete;
