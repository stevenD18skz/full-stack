import { Navigation } from "../components/Navigation";
import "../css/CrudUsersStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TableCrud } from "../components/TableCrud";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";



//TAREAS
export function CrudTaskPage({id_obra}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [seleccionado, setSeleccionado] = useState();

  const [isOpenView, setIsOpenView]     = useState(false);





  





  return (
      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-xl sm:rounded-lg bg-white">


        <CrudModels
          zoro="obras"
          id_obra={seleccionado.id}
        ></CrudModels>




        {isOpenView && 
          navigate(`/tareaVista/${seleccionado.id}`)
        }
      </div>
  );
}