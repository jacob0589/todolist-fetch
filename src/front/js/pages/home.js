import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const [arregloTemp, setArregloTemp] = useState([
		{ tarea: "Supermercado", done: false },
		{ tarea: "Meal Prep", done: false }
	]);

	const eliminarTarea = (indice) => {
		setArregloTemp(
			arregloTemp.filter((item, index) => {
				return index !==indice;
			})
		)
	}

	useEffect(() => { console.log("se renderizó el componente") }, [arregloTemp]);

	return (
		<div className="container-fluid justify-content-center align-item-center ">
			<div className="row d-flex justify-content-center m-5 p-5">
				<div className="row display-1 text-danger d-flex justify-content-center">
					Todos
				</div>
				<input
					placeholder="What needs to be done?"
					onKeyDown={(e) => { //event listener
						if (e.keyCode == "13") { //el 13 significa enter
							//console.log("Presionaste el enter")
							setArregloTemp([...arregloTemp, { tarea: e.target.value, done: false }])
						}
					}
					}
				/>
				{arregloTemp && arregloTemp.length > 0 ?
					<>{arregloTemp.map((item, index) => {
						return <li key={index} className="d-flex justify-content-between border m-0">
							{item.tarea}
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
					})}</>
					:
					<><h1>NO hay tareas</h1></>}
				<div className="fs-6 border"> {arregloTemp.length} Item left </div>
				<div className="relleno1 shadow fs-6 border">
				</div>
				<div className="relleno2 shadow fs-6 border">
				</div>
			</div>
		</div>
	);
};