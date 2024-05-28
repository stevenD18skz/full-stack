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
export function CrudModels({zoro, id_padre=0}) {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({});


  const [searchTerm, setSearchTerm]     = useState("");
  const [seleccionado, setSeleccionado] = useState();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit]     = useState(false);
  const [isOpenView, setIsOpenView]     = useState(false);

  const diccionario = {
    "usuarios": ["http://127.0.0.1:8000/crud/users/create/", "http://127.0.0.1:8000/crud/users/update/", "users",  1, "users"],
    "obras":    ["http://127.0.0.1:8000/works/",    `http://127.0.0.1:8000/works/${seleccionado.id}/`,      "works",    2, "works" ],
    "tareas":   ["http://127.0.0.1:8000/tasks/",    `http://127.0.0.1:8000/tasks/${seleccionado.id}/`,      "tasks",    3, "tasks"],
    "progreso": ["http://127.0.0.1:8000/progress/", `http://127.0.0.1:8000/progress/${seleccionado.id}/`,   "progress", 4, "progress"]


  }





  const openCreate = () => {
    setIsOpenCreate(true);
  };
  const closeCreate = () => {
    setIsOpenCreate(false);
  };





  const openEdit = (usuario) => {
    setSeleccionado(usuario);
    setIsOpenEdit(true);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
  };





  const openView = (usuario) => {
    console.log("2020209230")
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
      .post(diccionario[zoro][0], formData)
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
      .put(diccionario[zoro][1], formData)
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
      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-xl sm:rounded-lg bg-white">
        {/* MODAL DE CREAR*/}
        {isOpenCreate && (
          <Modal
            modalType={diccionario[zoro][2]}
            crudType="create"
            formData={formData}
            closeModal={closeCreate}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            id_padre={id_padre}
          />
        )}

        
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <button
              type="button"
              onClick={openCreate}
              className="text-gray-900 hover:text-white border hover:bg-gray-700 font-semibold rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-indigo-400 h-4 w-4"
              />{" "}
              Crear
            </button>
          </div>


          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="button-action block p-2 ps-10 text-sm rounded-lg w-80 dark:bg-gray-200"
              placeholder="Search for items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>


        <TableCrud index={diccionario[zoro][3]} openEdit={openEdit} openView={openView} searchTerm={searchTerm} filtredTerm={id_padre} closeEdit={isOpenEdit} closeCreate={closeCreate}/>
        

        {/* MODAL DE EDITAR*/}
        {isOpenEdit && (
          <Modal
            modalType={diccionario[zoro][4]}
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