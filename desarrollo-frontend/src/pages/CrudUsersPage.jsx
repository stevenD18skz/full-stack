import { Navigation } from "../components/Navigation";
import "../css/CrudUsersStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { TableCrud } from "../components/TableCrud";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";
import ModalUsers from "../components/ModalUsers";
import Modal from "../components/Modal";
import ModalView from "../components/ModalView";

export function CrudUsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    doc_type_user: "",
    doc_number_user: "",
    gender_user: "",
    address_user: "",
    phone_user: "",
    role_user: 0,
  });
  const [searchTerm, setSearchTerm]     = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit]     = useState(false);
  const [isOpenView, setIsOpenView]     = useState(false);

  const [seleccionado, setSeleccionado] = useState();

  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get("http://127.0.0.1:8000/users/");
      setUsuarios(response.data.results);
    }
    loadUsuarios();
  }, []);

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

  const openCreate = () => {
    setIsOpenCreate(true);
  };

  const closeCreate = () => {
    setIsOpenCreate(false);
  };

  async function openEdit(usuario) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/crud/users/create/", formData)
      .then((response) => {
        // Actualiza el estado con los datos de la respuesta
        Toast.fire({
          icon: "success",
          title: "Usuario creado con exito",
        });
        async function loadUsuarios() {
          closeCreate();
          const response = await axios.get("http://127.0.0.1:8000/users/");
          setUsuarios(response.data.results);
        }
        loadUsuarios();
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      });
  };

  const handleSubmitEdit = (e) => {
    console.log(formData)

    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/crud/users/update/", formData)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Usuario actualizado con exito",
        });
        async function loadUsuarios() {
          closeEdit();
          const response = await axios.get("http://127.0.0.1:8000/users/");
          setUsuarios(response.data.results);
        }
        loadUsuarios();
      })



      .catch((error) => {
        console.error("Error al editar el usuario:", error);
      });
  };

  const filteredUsers = usuarios.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navigation></Navigation>

      <div className=" m-6 px-8 py-6 relative overflow-x-auto shadow-md sm:rounded-lg">   
        {/* MODAL DE CREAR USUARIO */}
        {isOpenCreate && (
            <Modal
              modalType="users"
              closeCreate={closeCreate}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              crudType="create"
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
              Crear Usuario
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

        <TableCrud index={1} openEdit={openEdit} openView={openView} />

        {/* MODAL DE EDITAR USUARIO */}
        {isOpenEdit && (
            <Modal
              modalType="users"
              closeCreate={closeEdit}
              formData={formData} 
              setFormData={setFormData}
              handleChange={handleChange}
              handleSubmit={handleSubmitEdit}
              usuario={seleccionado}
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
