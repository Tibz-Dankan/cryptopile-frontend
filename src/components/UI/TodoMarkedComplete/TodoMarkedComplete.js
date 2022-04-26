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
  const [todoMarkedComplete, setTodoMarkedComplete] = useState(false);
  const [
    showTodoMarkedCompleteSuccessfully,
    setShowTodoMarkedCompleteSuccessfully,
  ] = useState(false);
  const [showFailedToMarkTodo, setShowFailedToMarkTodo] = useState(false);
  const [hasTodoChanged, setHasTodoChanged] = useContext(TodoChangeContext);
  const [todoId, setTodoId] = useState(todo.todoid);

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
  const markOrUnMarkTodo = () => {
    const checkBoxStatus = document.getElementById("check-box");
    // switch (checkBoxStatus) {
    //   case true:
    //     setTodoMarkedComplete(false);
    //     log(`check box status is : ${todoMarkedComplete}`);
    //     break;
    //   case false:
    //     setTodoMarkedComplete(true);
    //     log(`check box status is : ${todoMarkedComplete}`);
    //     break;
    //   default:
    // }
    if (todo.todomarkedcomplete === true) {
      setTodoMarkedComplete(false);
      log(`check box status is : ${todoMarkedComplete}`);
    } else {
      setTodoMarkedComplete(true);
      log(`check box status is : ${todoMarkedComplete}`);
    }
    log(`The check box status is :  ${todoMarkedComplete}`);
    return true;
  };

  const submitCurrentCheckBoxStatus = () => {
    markOrUnMarkTodo() && submitTodoCompletionStatus();
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
        setShowTodoMarkedCompleteSuccessfully(true);
        enableButton("check-box");
        openAndCloseModal();
        // TodoChanged(hasTodoChanged, setHasTodoChanged);
      }
      log(response.data.rows);
    } catch (error) {
      openAndCloseModal();
      setShowFailedToMarkTodo(true);
      enableButton("check-box");
      log(error);
    }
  };

  useEffect(() => {
    let checkBoxStatus = document.getElementById("check-box");
    if (
      todo.todomarkedcomplete == null ||
      todo.todomarkedcomplete === undefined
    ) {
      return;
    }
    if (todo.todomarkedcomplete === true) {
      checkBoxStatus.checked = true;
    }
  }, [todo.todomarkedcomplete]);

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
        <input
          type="checkbox"
          id="check-box"
          value={todoMarkedComplete}
          onClick={submitCurrentCheckBoxStatus}
        />
      </form>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Todo Completed"
      >
        <div className="modal-wrapper">
          {showTodoMarkedCompleteSuccessfully ? (
            <p className="todo-marked-complete-successfully">
              Todo marked complete successfully
            </p>
          ) : null}
          {showFailedToMarkTodo ? (
            <p className="failed-to-mark-todo">Failed to marked as complete</p>
          ) : null}
          <div className="close-modal" onClick={closeModal}>
            <X size={30} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoMarkedComplete;
