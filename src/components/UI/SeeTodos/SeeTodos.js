import React, { useState, useEffect, useContext } from "react";
import { PropagateLoader } from "react-spinners";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import EditTodoDescription from "../EditTodoDescription/EditTodoDescription";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import TodoMarkedComplete from "../TodoMarkedComplete/TodoMarkedComplete";
import { TodoChangeContext } from "../../../context/TodoChangeContext/TodoChangeContext";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import { log } from "../../../utils/ConsoleLog";
import "./SeeTodos.css";

const SeeTodos = () => {
  const [todos, setTodos] = useState([]);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showPropagateLoader, setShowPropagateLoader] = useState(false);
  const [showTableOfTodos, setShowTableOfTodos] = useState(false);
  const [hasTodoChanged, setHasTodoChanged] = useContext(TodoChangeContext);

  const getUserTodos = async () => {
    try {
      setShowPropagateLoader(true);
      disableButton("button");
      const getTodos = await axiosApiAuthorized.get(
        `api/get-todos/${sessionStorage.getItem("userId")}`
      );

      setShowPropagateLoader(false);
      log(getTodos);
      let arrayOfTodos = getTodos.data;
      log(arrayOfTodos);
      setTodos(arrayOfTodos);
      setShowCatchError(false);
      enableButton("button");
      if (getTodos.data[0] == null || getTodos.data[0] === undefined) {
        return;
      } else {
        setShowTableOfTodos(true);
      }
    } catch (err) {
      log(err);
      setShowCatchError(true);
      setShowPropagateLoader(false);
      enableButton("button");
    }
  };

  // show todos on rendering and after every update
  useEffect(() => {
    getUserTodos();
    return setTodos([]);
  }, [hasTodoChanged, setHasTodoChanged]);

  return (
    <div>
      <div className="see-todos-wrapper">
        {showCatchError && (
          <div className="see-todo-catch-error-msg">
            <p>Sorry, something went wrong!</p>
          </div>
        )}

        {showPropagateLoader && (
          <div className="propagate-loader-wrapper">
            <PropagateLoader size={12} color="hsl(180, 100%, 30%)" />
            <h5>Loading...</h5>
          </div>
        )}

        {showTableOfTodos ? (
          <div className="table-wrapper">
            <button
              onClick={getUserTodos}
              className="Reload-button Reload-button-near-table"
              id="button"
            >
              RELOAD
            </button>
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>TodoDescription</th>
                  <th>Delete</th>
                </tr>
                {todos.map((todo) => {
                  return (
                    <tr key={todo.todoid}>
                      <td>{todo.dateofadd}</td>
                      <td>{todo.timeofadd}</td>
                      <td id="todo-description-id">
                        <span
                          style={{
                            textDecoration:
                              todo.todomarkedcomplete && "line-through",
                          }}
                        >
                          {todo.description}
                        </span>
                        {<EditTodoDescription todo={todo} />}
                        {<TodoMarkedComplete todo={todo} />}
                      </td>
                      <td>{<DeleteTodo todo={todo} />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="you-have-no-todos">
            <button
              onClick={getUserTodos}
              className="Reload-button"
              id="button"
            >
              RELOAD
            </button>
            <p>No Todos loaded yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeTodos;
