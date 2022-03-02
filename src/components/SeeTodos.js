import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axiosApiAuthorized from "./axiosAuthorized";
import EditPileDescription from "./EditPileDescription";
import DeletePile from "./DeletePile";
import "./../css/SeeTodos.css";

const SeeTodos = () => {
  const [todos, setTodos] = useState([]);
  const [displayCatchError, setDisplayCatchError] = useState(false);
  const [displayPropagateLoader, setDisplayPropagateLoader] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);

  // "getpile" in the url below should renamed to "get-todos"
  const getUserTodos = async () => {
    try {
      setDisplayPropagateLoader(true);
      const getTodos = await axiosApiAuthorized.get(
        `api/getpile/${localStorage.getItem("userId")}`
      );

      setDisplayPropagateLoader(false);
      console.log(getTodos); // to be removed
      let arrayOfTodos = getTodos.data;
      console.log(arrayOfTodos); // to be removed
      setTodos(arrayOfTodos);
      setDisplayCatchError(false);
      window.scrollTo(0, 0); // scrolling to the top
      if (getTodos.status === 200 && getTodos.data[0] !== null) {
        setDisplayTable(true);
      }
    } catch (err) {
      console.log(err);
      window.scrollTo(0, 0); // scrolling to the top
      setDisplayCatchError(true);
      setDisplayPropagateLoader(false);
    }
  };

  // show pile on rendering and after every update
  useEffect(() => {
    getUserTodos();
    return setTodos([]);
  }, []);

  return (
    <div>
      <div className="view-pile-wrapper">
        {displayCatchError ? (
          <div className="view-pile-error-msg">
            <p>Sorry, something went wrong!</p>
          </div>
        ) : null}

        <div className="pile-wrapper">
          {displayPropagateLoader ? (
            <div className="propagate-loader-wrapper">
              <PropagateLoader size={12} color="hsl(180, 100%, 30%)" />
              <h5>Loading...</h5>
            </div>
          ) : null}
        </div>

        {displayTable ? (
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
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
            <p>You have no Todos yet!</p>
            <p>
              To add <b>Todos</b> click <Link to="/addtodos">here</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeTodos;
