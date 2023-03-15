import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const cargaDeDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        "todos/user/jacob"
      );
      if (response.ok) {
        setTodos(respuestaJson);
      }
    };
    cargaDeDatos();
  }, []);

  useEffect(() => {}, [todos]);

  const eliminarTarea = async (indice) => {
    let arrTemp = todos.filter((item, index) => {
      return index !== indice;
    });

    let { respuestaJson, response } = await actions.useFetch(
      "todos/user/jacob",
      arrTemp,
      "PUT"
    );
    if (response.ok) {
      setTodos(arrTemp);
    } else {
      alert("No hubo conexión");
    }
  };

  return (
    <div className="container-fluid justify-content-center align-item-center ">
      <div className="row d-flex justify-content-center m-5 p-5">
        <div className="row display-1 text-danger d-flex justify-content-center">
          Todos
        </div>
        <input
          placeholder="What needs to be done?"
          onKeyDown={async (e) => {
            if (e.keyCode === 13) {
              const newTodo = { label: e.target.value, done: false };
              const updatedTodos = [...todos, newTodo];
              setTodos(updatedTodos);
              const { respuestaJson, response } = await actions.useFetch(
                "todos/user/jacob",
                updatedTodos,
                "PUT"
              );
              if (!response.ok) {
                alert("No se pudo guardar la nueva tarea");
              }
              e.target.value = "";
            }
          }}
        />
        {todos && todos.length > 0 ? (
          <>
            {todos.map((item, index) => {
              return (
                <li
                  key={index}
                  className="d-flex justify-content-between border m-0"
                >
                  {item.label}
                  <p
                    className="ocultar text-danger"
                    type="button"
                    onClick={() => {
                      eliminarTarea(index);
                    }}
                  >
                    X
                  </p>
                </li>
              );
            })}
          </>
        ) : (
          <>
            <h1>NO hay tareas</h1>
          </>
        )}
        <div className="fs-6 border"> {todos.length} Item left </div>
        <div className="relleno1 shadow fs-6 border"></div>
        <div className="relleno2 shadow fs-6 border"></div>
      </div>
    </div>
  );
};
