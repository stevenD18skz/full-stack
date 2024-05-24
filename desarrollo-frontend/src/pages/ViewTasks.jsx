import { Navigation } from "../components/Navigation";
import { CrudProgresTasks } from "./CrudProgessTaks";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function ViewTasks() {
  const { tarea } = useParams(); // Obtiene el ID de obra del parámetro 'obra'
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



      <div class="relative w-full">
        <h1 class="absolute top-2 left-2 border-2 border-green-500 p-1">
          {seleccionado.task_name}
        </h1>
        <div class="absolute top-14 left-2 right-2 border-2 border-blue-300 p-2 bg-slate-300 rounded-xl">
          <p class="m-3">{seleccionado.task_description}</p>
        </div>
      </div>

      <hr className="h-40" />



      <div class="flex">
        <div
          name="Modal_info"
          class="bg-orange-300 w-1/3 h-auto border-2 border-red-500 m-4 rounded-3xl p-4"
        >
          <p>Tipo de tarea: {seleccionado.task_type}</p>
          {/*aqui solo esta el id <p>Directo de obra: {seleccionado.id_manager_work}</p>*/}
          <p>Capataz a cargo: {seleccionado.name_capataz}</p>
          <p>Fecha de creacion: {seleccionado.task_assignment_date}</p>
          <p>Fecha de finalizacion: {seleccionado.task_finish_date}</p>
          <p>Estado: {seleccionado.name_status}</p>
          <p>Trabajadores:</p>
          <div class="bg-blue-200 rounded-xl p-3">
            {seleccionado.user_names.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div
          name="tabla"
          class="w-2/3 h-auto border-2 border-blue-500 m-4 rounded-3xl p-4"
        >
          <CrudProgresTasks></CrudProgresTasks>
        </div>
      </div>


      








    </div>
  );
}
