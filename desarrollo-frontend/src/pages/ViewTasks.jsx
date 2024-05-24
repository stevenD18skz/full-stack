import { Navigation } from "../components/Navigation";
import { CrudProgresTasks } from "./CrudProgessTaks";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function ViewTasks() {
  const { tarea } = useParams(); // Obtiene el ID de obra del parámetro 'obra'
  console.log(tarea)
  const [seleccionado, setSeleccionado] = useState();

  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get(`http://127.0.0.1:8000/tasks/${tarea}`);
      setSeleccionado(response.data);
      console.log(response.data);
    }
    loadUsuarios();
  }, []);


  if (!seleccionado) {
    return (
      <div>
        <Navigation />
        <h1 className="text-center">Cargando...</h1>
      </div>
    );
  }



  
  return (
    <div className="bg-slate-100">
      <Navigation></Navigation>



      <div className="relative w-full">
        <h1 className="absolute top-2 left-2 text-4xl font-semibold m-4 text-blue-900">
          {seleccionado.task_name}
        </h1>
        <div className="absolute left-2 right-2 p-2 bg-slate-200 rounded-xl mt-20">
          <p className="m-3">{seleccionado.task_description}</p>
        </div>
      </div>

      <hr className="h-40" />



      <div className="flex">
        <div
          name="Modal_info"
          className="mx-8 rounded-3xl p-3 mt-11 border-2 border-slate-700 min-w-80 min-h-12"
        >
          <p><b>Tipo de tarea: </b> {seleccionado.task_type}</p>
          {/*aqui solo esta el id <p>Directo de obra: {seleccionado.id_manager_work}</p>*/}
          <p><b>Capataz a cargo: </b>  {seleccionado.name_capataz}</p>
          <p><b>Fecha de creacion: </b> {seleccionado.task_assignment_date}</p>
          <p><b>Fecha de finalizacion: </b> {seleccionado.task_finish_date}</p>
          <p><b>Estado: </b> {seleccionado.name_status}</p>
          <hr className="h-10" />
          <p><b>Trabajadores: </b></p>
          <div className="bg-blue-200 rounded-xl p-3">
            {seleccionado.user_names.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div
          name="tabla"
          className="min-w-8 m-4 rounded-3xl p-4"
        >
          <CrudProgresTasks id_tarea={tarea}></CrudProgresTasks>
        </div>
      </div>


      








    </div>
  );
}
