import React, { useState } from "react";
import axios from "axios";


const logInPruebas = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nombre,
      correo,
    };

    try {
      const response = await axios.post("/usuarios/", data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
      />
      <label htmlFor="correo">Correo electrónico:</label>
      <input
        type="email"
        id="correo"
        name="correo"
        value={correo}
        onChange={(event) => setCorreo(event.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};