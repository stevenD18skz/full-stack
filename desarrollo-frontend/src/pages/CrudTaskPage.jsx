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


export function CrudTaskPage({id_obra}) {
  const [formData, setFormData] = useState({
    task_name: "",
    task_description: "",
    id_work: id_obra,
    id_workers: "",
    id_foreman: "",
    task_type: "",
    task_status: "",
  });


  const [searchTerm, setSearchTerm]     = useState("");
  const [seleccionado, setSeleccionado] = useState();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit]     = useState(false);
  const [isOpenView, setIsOpenView]     = useState(false);





  const openCreate = () => {
    setIsOpenCreate(true);
  };
  const closeCreate = () => {
    setIsOpenCreate(false);    
    formData["task_name"] = ""
    formData["task_description"] = ""
    formData["id_work"] = [1]
    formData["id_workers"] = ""
    formData["id_foreman"] = ""
    formData["task_type"] = ""
    formData["task_status"] = ""
  };





  const openEdit = (usuario) => {
    setSeleccionado(usuario);
    setIsOpenEdit(true);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
    formData["task_name"] = ""
    formData["task_description"] = ""
    formData["id_work"] = [1]
    formData["id_workers"] = ""
    formData["id_foreman"] = ""
    formData["task_type"] = ""
    formData["task_status"] = ""
  };





  const openView = (usuario) => {
    setSeleccionado(usuario);
    setIsOpenView(true);
  };
  const closeView = () => {
    setIsOpenView(false);
  };






  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/tasks/", formData)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Objeto Creado con Exito",
        });
        closeCreate();
      })
      .catch((error) => {
        console.error("Error al crear:", error);
      });
  };


  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/tasks/${seleccionado.id}/`, formData)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Objeto actualizado con exito",
        });
        closeEdit();
      })
      .catch((error) => {
        console.error("Error al editar:", error);
      });
  };






  return (
      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-md sm:rounded-lg bg-green-300">
        {/* MODAL DE CREAR*/}
        {isOpenCreate && (
          <Modal
            modalType="tasks"
            crudType="create"
            formData={formData}
            closeModal={closeCreate}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        )}



        <TableCrud index={3} openEdit={openEdit} openView={openView} searchTerm={searchTerm} filtredTerm={id_obra} closeEdit={isOpenEdit} closeCreate={closeCreate}/>
        

        {/* MODAL DE EDITAR*/}
        {isOpenEdit && (
          <Modal
            modalType="tasks"
            crudType="edit"
            closeModal={closeEdit}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmitEdit}
            objectModel={seleccionado}
          />
        )}
      </div>
  );
}