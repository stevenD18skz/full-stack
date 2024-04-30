import { Navigation } from "../components/Navigation";
import "../css/CrudUsersStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faUserMinus,
  faUserCheck,
  faCircleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TableCrud } from "../components/TableCrud";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";



export function CrudUsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    //password: "",
    fotografia: null,
    tipo_identificacion: "",
    nro_identificacion: "",
    genero: "",
    direccion: "",
    celular: "",
    //rol: null
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [seleccionado, setSeleccionado] = useState();

  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsuarios(response.data.results);
    }
    loadUsuarios();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/crear-usuario/", formData)
      .then((response) => {
        // Actualiza el estado con los datos de la respuesta
        Toast.fire({
          icon: "success",
          title: "Usuario creado con exito",
        });
        async function loadUsuarios() {
          closeCreate();
          const response = await axios.get("http://127.0.0.1:8000/api/users/");
          setUsuarios(response.data.results);
        }
        loadUsuarios();
      })
      .catch((error) => {
        console.error("Error al obtener los chats:", error);
      });
  };

  const filteredUsers = usuarios.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const toastInhabilitar = (sol) => {
    Swal.fire({
      title: `Estás seguro que quieres desactivar a ${sol.first_name}`,
      text: "No podra acceder mas a la pagina",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "no",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Inhabilitar(sol);
        Toast.fire({
          icon: "success",
          title: "Usuario inhabilitado con exito",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "el usuario no se inhabilito",
        });
      }
    });
  };

  const Inhabilitar = (sol) => {
    async function loadUsuarios() {
      console.log("Eliminar usuario con username:", sol.username);
      const nombre_usuario = sol.username;
      axios.post("http://127.0.0.1:8000/inhabilitar/", {
        username: nombre_usuario,
      });
      const response = axios.get("http://127.0.0.1:8000/api/users/");
      setUsuarios(response.data.results);
    }
    loadUsuarios();
  };

  const habilitar = (luna) => {
    async function loadUsuarios() {
      console.log("Eliminar usuario con username:", luna.username);
      const nombre_usuario = luna.username;
      axios.post("http://127.0.0.1:8000/habilitar/", {
        username: nombre_usuario,
      });

      const response = axios.get("http://127.0.0.1:8000/api/users/");
      setUsuarios(response.data.results);
    }

    loadUsuarios();
  };

  const toastHabilitar = (luna) => {
    Swal.fire({
      title: "Estas seguro",
      text: `Vas a habilitar a ${luna.first_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        habilitar(luna);
        Toast.fire({
          icon: "success",
          title: "Usuario Habilitado con exito",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "el usuario continuara Inhabilitado",
        });
      }
    });
  };

  return (
    <div>
      <Navigation></Navigation>

      <div className="px-8 py-6  relative overflow-x-auto shadow-md sm:rounded-lg">
        {isOpenCreate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeCreate}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="lg"
                  style={{ color: "#113778" }}
                />
              </span>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="gap-4 mb-4 grid-cols-2">
                  <h3 className="pb-8 text-3xl">Crear Usuario</h3>
                  <div className="col-span-2">
                    <label
                      htmlFor="user"
                      className=" block mb-2 text-sm font-medium"
                    >
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder="Nombre de Usuario"
                      required
                    />
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium"
                      >
                        Nombres
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Nombres"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Apellidos"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder="Correo Electrónico"
                      required
                    ></input>
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="identity"
                        className="block mb-2 text-sm font-medium"
                      >
                        Tipo de Identificación
                      </label>
                      <select
                        id="tipo_identificacion"
                        name="tipo_identificacion"
                        value={formData.tipo_identificacion}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value=""></option>
                        <option value="CC">Cédula de Ciudadania</option>
                        <option value="CE">Cédula de Extranjeria</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="user_id"
                        className="block mb-2 text-sm font-medium"
                      >
                        N° Identificación
                      </label>
                      <input
                        type="text"
                        id="nro_identificacion"
                        name="nro_identificacion"
                        value={formData.nro_identificacion}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="N° Identificación"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium"
                      >
                        Género
                      </label>
                      <select
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value=""></option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="B">No Binario</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium"
                      >
                        Teléfono
                      </label>
                      <input
                        type="phone"
                        id="celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Teléfono"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="direccion"
                      className="block mb-2 text-sm font-medium"
                    >
                      Dirección
                    </label>
                    <input
                      type="address"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder="Dirección"
                      required
                    ></input>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="rol"
                          className="block mb-2 text-sm font-medium"
                        >
                          Tipo de usuario
                        </label>
                        <select
                          id="rol"
                          name="rol"
                          value={formData.rol}
                          onChange={handleChange}
                          className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                          <option value=""></option>
                          <option value="4">gerente</option>
                          <option value="5">dirctor de obra</option>
                          <option value="6">capataz</option>
                          <option value="7">peon</option>
                          <option value="8">ayudante</option>
                        </select>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium"
                        >
                          Teléfono
                        </label>
                        <input
                          type="file"
                          id="foto"
                          name="foto"
                          accept="image/*"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800 text-white"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  Crear Usuario
                </button>
              </form>
            </div>
          </div>
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

        <TableCrud indice={1}/>

        {isOpenEdit && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeEdit}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="lg"
                  style={{ color: "#113778" }}
                />
              </span>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="gap-4 mb-4 grid-cols-2">
                  <h3 className="pb-8 text-3xl">
                    Trabajador {seleccionado.first_name}
                  </h3>
                  <div className="col-span-2">
                    <label
                      htmlFor="user"
                      className=" block mb-2 text-sm font-medium"
                    >
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      name="user"
                      id="user"
                      value={formData.user}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder={seleccionado.username}
                      required
                    />
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium"
                      >
                        Nombres
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder={seleccionado.first_name}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder={seleccionado.last_name}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder={seleccionado.email}
                      required
                    ></input>
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="identity"
                        className="block mb-2 text-sm font-medium"
                      >
                        Tipo de Identificación
                      </label>
                      <select
                        id="identity"
                        name="identity"
                        value={formData.identity}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value=""></option>
                        <option value="CC">Cédula de Ciudadania</option>
                        <option value="CE">Cédula de Extranjeria</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="user_id"
                        className="block mb-2 text-sm font-medium"
                      >
                        N° Identificación
                      </label>
                      <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder={seleccionado.nro_identificacion}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium"
                      >
                        Género
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value=""></option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="B">No Binario</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium"
                      >
                        Teléfono
                      </label>
                      <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder={seleccionado.celular}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium"
                    >
                      Dirección
                    </label>
                    <input
                      type="address"
                      id="address"
                      name="phone"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                      placeholder={seleccionado.direccion}
                      required
                    ></input>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium"
                    >
                      Género
                    </label>
                    <select
                      id="gender"
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
                    >
                      <option value=""></option>
                      <option value="gerente">gerente</option>
                      <option value="dirctor de obra">dirctor de obra</option>
                      <option value="capataz">capataz</option>
                      <option value="peon">peon</option>
                      <option value="ayudante">ayudante</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800 text-white"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  Crear Usuario
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
