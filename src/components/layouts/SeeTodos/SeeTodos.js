import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import axiosApiAuthorized from "../../../AxiosApi/axiosAuthorized";
import EditTodoDescription from "../EditTodoDescription/EditTodoDescription";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import "./SeeTodos.css";

const SeeTodos = () => {
  const [todos, setTodos] = useState([]);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showPropagateLoader, setShowPropagateLoader] = useState(false);
  const [showTableOfTodos, setShowTableOfTodos] = useState(false);

  // "getpile" in the url below should renamed to "get-todos" (Done)
  const getUserTodos = async () => {
    try {
      setShowPropagateLoader(true);
      const getTodos = await axiosApiAuthorized.get(
        `api/get-todos/${localStorage.getItem("userId")}`
      );

      setShowPropagateLoader(false);
      console.log(getTodos); // to be removed
      let arrayOfTodos = getTodos.data;
      console.log(arrayOfTodos); // to be removed
      setTodos(arrayOfTodos);
      setShowCatchError(false);
      window.scrollTo(0, 0); // scrolling to the top
      if (getTodos.status === 200 && getTodos.data[0] !== null) {
        setShowTableOfTodos(true);
      }
    } catch (err) {
      console.log(err);
      window.scrollTo(0, 0); // scrolling to the top
      setShowCatchError(true);
      setShowPropagateLoader(false);
    }
  };

  // show todos on rendering and after every update
  useEffect(() => {
    getUserTodos();
    return setTodos([]);
  }, []);

  return (
    <div>
      <div className="see-todos-wrapper">
        {showCatchError ? (
          <div className="catch-error-msg">
            <p>Sorry, something went wrong!</p>
          </div>
        ) : null}

        {showPropagateLoader ? (
          <div className="propagate-loader-wrapper">
            <PropagateLoader size={12} color="hsl(180, 100%, 30%)" />
            <h5>Loading...</h5>
          </div>
        ) : null}

        {showTableOfTodos ? (
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
                      {todo.description} {<EditTodoDescription todo={todo} />}
                    </td>
                    <td>{<DeleteTodo todo={todo} />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="you-have-no-todos">
            <p>No Todos loaded yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeTodos;
