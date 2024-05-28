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
import ViewModalProgress from "../components/ViewModelProgress";


//PROGRESO
export function CrudProgresTasks({id_tarea}) {
  const [formData, setFormData] = useState({});

  const [seleccionado, setSeleccionado] = useState();


  const [isOpenView, setIsOpenView]     = useState(false);







  return (
    <div>
      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-md sm:rounded-lg">

        <CrudModels
          zoro="obras"
          id_obra={seleccionado.id}
        ></CrudModels>

        {isOpenView && 
          <ViewModalProgress
          closeView={closeView}
          formData={formData}
          setFormData={setFormData}
          usuario={seleccionado}
          >
          </ViewModalProgress>


        }

      </div>
    </div>
  );
}