import React from "react";
import { Navigation } from "../components/Navigation";
import { CrudTaskPage } from "./CrudTaskPage";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export function ViewWork({id_obra}) {
  const { obra } = useParams(); // Obtiene el ID de obra del parámetro 'obra'
  console.log(obra)
  const [seleccionado, setSeleccionado] = useState();


  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get(`http://127.0.0.1:8000/works/${obra}`);
      setSeleccionado(response.data);
      console.log(response.data)
    }
    loadUsuarios();
  }, []);
  

  
  return (
    <div>
      <Navigation></Navigation>
      
      <h1 className="text-center">8</h1>
      <CrudTaskPage></CrudTaskPage>
    </div>
  );
};