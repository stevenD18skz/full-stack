import React from "react";
import { Navigation } from "../components/Navigation";
import { CrudTaskPage } from "./CrudTaskPage";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function ViewWork({ id_obra }) {
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
    <div>
      <Navigation></Navigation>

      <h1 className="m-4 text-3xl">{seleccionado.name_work}</h1>
      <h3 className="m-4 text-1xl">{seleccionado.location_work}</h3>
      <div className="bg-slate-300 h-12 rounded-xl mx-4 my-6">
        <p className="m-3">{seleccionado.description_work}</p>
      </div>

      <div
        name="Modal_info"
        className="bg-orange-300 w-2/3 h-80 m-6 rounded-3xl p-4"
      >
        <p>Tipo de obra: {seleccionado.type_work}</p>
        {/*aqui solo esta el id <p>Directo de obra: {seleccionado.id_manager_work}</p>*/}
        <p>Directo de obra: {seleccionado.name_director}</p>
        <p>Fecha de creacion: --------------</p>
        <p>Creado por: --------------</p>
        <p>Trabajadores:</p>
        <div className="bg-blue-200 rounded-xl p-3">
          {seleccionado.user_names.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>

      <CrudTaskPage id_obra={seleccionado.id}></CrudTaskPage>
    </div>
  );
}
