import { Navigation } from "../components/Navigation";
import "../css/CrudUsersStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { TableCrud } from "../components/TableCrud";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";
import ModalTask from "../components/ModalTask";
import Modal from "../components/Modal";
import ModalView from "../components/ModalView";

export function CrudTaskPage() {
  const [formData, setFormData] = useState({
    task_name: "",
    task_description: "",
    id_work: "",
    id_workers: "",
    id_foreman: "",
    task_type: "",
    task_status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);

  const [seleccionado, setSeleccionado] = useState();

  const [obras, setObras] = useState();

  useEffect(() => {
    async function loadWorks() {
      const response = await axios.get("http://127.0.0.1:8000/works/");
      setObras(response.data.results)
      console.log(obras)
    }
    loadWorks();
  }, []);

  

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
    setSeleccionado(usuario);
    setIsOpenView(true);
  };
  const closeView = () => {
    setIsOpenView(false);
  };

  const handeldChangeSelect = (e) => {
    const { key, name, value } = e.target;
    console.log(value);
    //setFormData({ ...formData, [name]: value });
    console.log(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      .post("http://127.0.0.1:8000/crud/task/", formData)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Tarea creada con éxito",
        });

        setUsuarios(axios.get("http://127.0.0.1:8000/tasks/").data.results);
        closeCreate();
      })
      .catch((error) => {
        console.error("Error al crear la tarea:", error);
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://127.0.0.1:8000/crud/task/", formData)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Tarea actualizada con éxito",
        });
        setUsuarios(axios.get("http://127.0.0.1:8000/tasks/").data.results);
        closeEdit();
      })
      .catch((error) => {
        console.error("Error al editar la tarea:", error);
      });
  };

  return (
    <div>
      <Navigation></Navigation>

      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* MODAL DE CREAR TAREA */}
        {isOpenCreate && (
          <Modal
            modalType="tasks"
            closeModal={closeCreate}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            crudType="create"
          />
        )}

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <select
            id="task_status"
            name="task_status"
            onChange={handeldChangeSelect}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value=""></option>
            <option value={0}>Pendiente</option>
            <option value={1}>En progreso</option>
            <option value={2}>Completada</option>
          </select>

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
              Crear tarea
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

        <TableCrud
          index={3}
          openEdit={openEdit}
          openView={openView}
          searchTerm={searchTerm}
        />

        {/* MODAL DE EDITAR USUARIO */}
        {isOpenEdit && (
          <Modal
            modalType="tasks"
            closeModal={closeEdit}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmitEdit}
            objectModel={seleccionado}
            crudType="edit"
          />
        )}

        {isOpenView && (
          <ModalView
            closeView={closeView}
            formData={formData}
            setFormData={setFormData}
            usuario={seleccionado}
          />
        )}
      </div>
    </div>
  );
}
