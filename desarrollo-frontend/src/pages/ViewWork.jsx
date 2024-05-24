import { Navigation } from "../components/Navigation";
import { CrudTaskPage } from "./CrudTaskPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function ViewWork() {
  const { obra } = useParams(); // Obtiene el ID de obra del parámetro 'obra'
  const [seleccionado, setSeleccionado] = useState();

  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get(`http://127.0.0.1:8000/works/${obra}`);
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
        <h1 class="absolute top-2 left-2 border-2 border-green-500 p-1 text-3xl">
          {seleccionado.name_work}
        </h1>
        <h3 class="absolute top-2 right-2 border-2 border-red-500 p-1 text-1xl">
          {seleccionado.location_work}
        </h3>
        <div class="absolute top-14 left-2 right-2 border-2 border-blue-300 p-2 bg-slate-300 rounded-xl">
          <p class="m-3">{seleccionado.description_work}</p>
        </div>
      </div>

      <hr className="h-40" />



      <div class="flex">
        <div
          name="Modal_info"
          class="bg-orange-300 w-1/3 h-auto border-2 border-red-500 m-4 rounded-3xl p-4"
        >
          <p>Tipo de obra: {seleccionado.type_work}</p>
          {/*aqui solo esta el id <p>Directo de obra: {seleccionado.id_manager_work}</p>*/}
          <p>Directo de obra: {seleccionado.name_director}</p>
          <p>Fecha de creacion: --------------</p>
          <p>Creado por: --------------</p>
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
          <CrudTaskPage id_obra={seleccionado.id}></CrudTaskPage>
        </div>
      </div>


      








    </div>
  );
}
