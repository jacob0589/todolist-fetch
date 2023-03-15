import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [arregloTemp, setArregloTemp] = useState([]);
  useEffect(() => {
    const cargaDeDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        "todos/user/jacob"
      );
      if (response.ok) {
        setArregloTemp(respuestaJson);
      }
    };
    cargaDeDatos();
  }, []);

  useEffect(() => {}, [arregloTemp]);

  const eliminarTarea = (indice) => {
    setArregloTemp(
      arregloTemp.filter((item, index) => {
        return index !== indice;
      })
    );
  };

  return (
    <div className="container-fluid justify-content-center align-item-center ">
      <div className="row d-flex justify-content-center m-5 p-5">
        <div className="row display-1 text-danger d-flex justify-content-center">
          Todos
        </div>
        <input
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            //event listener
            if (e.keyCode == "13") {
              //el 13 significa enter
              //console.log("Presionaste el enter")
              setArregloTemp([
                ...arregloTemp,
                { label: e.target.value, done: false },
              ]);
            }
          }}
        />
        {arregloTemp && arregloTemp.length > 0 ? (
          <>
            {arregloTemp.map((item, index) => {
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
        <div className="fs-6 border"> {arregloTemp.length} Item left </div>
        <div className="relleno1 shadow fs-6 border"></div>
        <div className="relleno2 shadow fs-6 border"></div>
      </div>
    </div>
  );
};
