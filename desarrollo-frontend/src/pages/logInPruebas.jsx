import React, { useState } from "react";
import axios from "axios";


export function LogInPruebas() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nombre,
      correo,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/users/", data);
      console.log(response.data);
    } catch (error) {
      console.log('NO PUDE HACER EL POST')
      console.error(error.message);
    }
  };

  return (
    <div className="bg-red-600 text-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-4/5 rounded-2xl ">

        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="correo" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar
          </button>
        </div>

      </form>
    </div>
  );
};