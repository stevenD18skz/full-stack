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
import ModalViewUsers from "../components/ModalViewUsers";
import { CrudModels } from "./CrudModels";
//USUARIOS
export function CrudUsersPage() {
  
  const [formData, setFormData] = useState({});

  const [seleccionado, setSeleccionado] = useState();

  const [isOpenView, setIsOpenView]     = useState(false);


  return (
    <div className="bg-slate-200">
      <Navigation></Navigation>
      
        <CrudModels
          zoro="usuarios"
        ></CrudModels>



        {/* MODAL DE VISTA*/}
        {isOpenView && (
          <ModalViewUsers
            closeView={closeView}
            formData={formData}
            setFormData={setFormData}
            usuario={seleccionado}
          />
        )}
      </div>
  );
}