import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import axiosApiAuthorized from "./axiosAuthorized";
import EditPileDescription from "./EditPileDescription";
import DeletePile from "./DeletePile";
import "./../css/SeeTodos.css";

const SeeTodos = () => {
  const [todos, setTodos] = useState([]);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showPropagateLoader, setShowPropagateLoader] = useState(false);
  const [showTableOfTodos, setShowTableOfTodos] = useState(false);

  // "getpile" in the url below should renamed to "get-todos"
  const getUserTodos = async () => {
    try {
      setShowPropagateLoader(true);
      const getTodos = await axiosApiAuthorized.get(
        `api/getpile/${localStorage.getItem("userId")}`
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

  // show pile on rendering and after every update
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
              {todos.map((pile) => {
                return (
                  <tr key={pile.todoid}>
                    <td>{pile.dateofadd}</td>
                    <td>{pile.timeofadd}</td>
                    <td id="pile-description-id">
                      {pile.description} {<EditPileDescription pile={pile} />}
                    </td>
                    <td>{<DeletePile pile={pile} />}</td>
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
