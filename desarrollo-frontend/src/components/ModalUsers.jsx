import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalUsers({formData, setFormData, handleChange, handleSubmit, crudType, usuario = {},}) {
  const [selectedDocument, setSelectedDocument] = useState(usuario.doc_type_user);
  const [selectedGender, setSelectedGender] = useState(usuario.gender_user);
  const [selectedRole, setSelectedRole] = useState(usuario.role_user);


  const guardarTipoDocumento = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  //formData.username = usuario.username
  //formData.first_name = usuario.first_name
  //formData.last_name = usuario.last_name
  //formData.email = usuario.email
  //formData.doc_type_user = usuario.doc_type_user
  //formData.doc_number_user = usuario.doc_number_user
  //formData.gender_user = usuario.gender_user
  //formData.address_user = usuario.address_user
  //formData.phone_user = usuario.phone_user
  //formData.role_user = usuario.role_user

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
      <div className="gap-4 mb-4 grid-cols-2">


        <h3 className="pb-8 text-3xl">
          {crudType === "create" ? "Crear usuario" : "Editar usuario"}{" "}
        </h3>



        <div className="col-span-2">
          <label htmlFor="user" className=" block mb-2 text-sm font-medium">
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
            placeholder={
              crudType === "create" ? "Nombre de Usuario" : usuario.username
            }
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>



        <div className="m-4 grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Nombres
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Nombres" : usuario.first_name
              }
              {...(crudType === "create" ? { required: true } : {})}
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
              placeholder={
                crudType === "create" ? "Apellidos" : usuario.last_name
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>
        </div>



        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
            placeholder={
              crudType === "create" ? "Correo electronico" : usuario.email
            }
            {...(crudType === "create" ? { required: true } : {})}
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

            {crudType === "create" ? (
              <select
                id="doc_type_user"
                name="doc_type_user"
                value={formData.doc_type_user}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="CC">Cédula de Ciudadania</option>
                <option value="CE">Cédula de Extranjeria</option>
                <option value="PA">Pasaporte</option>
              </select>
            ) : (
              <select
                id="doc_type_user"
                name="doc_type_user"
                value={selectedDocument}
                onChange={(e) => {
                  guardarTipoDocumento(e);
                }}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="CC">Cédula de Ciudadania</option>
                <option value="CE">Cédula de Extranjeria</option>
                <option value="PA">Pasaporte</option>
              </select>
            )}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="user_id" className="block mb-2 text-sm font-medium">
              N° Identificación
            </label>
            <input
              type="text"
              id="doc_number_user"
              name="doc_number_user"
              value={formData.doc_number_user}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create"
                  ? "N° identificacion"
                  : usuario.doc_number_user
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>
        </div>



        <div className="m-4 grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium">
              Género
            </label>
            {crudType === "create" ? (
              <select
                id="gender_user"
                name="gender_user"
                value={formData.gender_user}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            ) : (
              <select
                id="gender_user"
                name="gender_user"
                value={selectedGender}
                onChange={(e) => {
                  guardarTipoDocumento(e);
                }}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            )}
          </div>

          
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">
              Celular
            </label>
            <input
              type="phone"
              id="phone_user"
              name="phone_user"
              value={formData.phone_user}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Celular" : usuario.phone_user
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>
        </div>



        <div className="m-4 grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="adress" className="block mb-2 text-sm font-medium">
              Dirección
            </label>
            <input
              type="address_user"
              id="address_user"
              name="address_user"
              value={formData.address_user}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5"
              placeholder={
                crudType === "create" ? "Direccion" : usuario.address_user
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="rol" className="block mb-2 text-sm font-medium">
              Rol
            </label>
            {crudType === "create" ? (
              <select
                id="role_user"
                name="role_user"
                value={formData.role_user}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="1">Gerente</option>
                <option value="2">Director de obra</option>
                <option value="3">Capataz</option>
                <option value="4">Peon</option>
                <option value="5">Ayudante</option>
              </select>
            ) : (
              <select
                id="role_user"
                name="role_user"
                value={selectedRole}
                onChange={(e) => {
                  guardarTipoDocumento(e);
                }}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value=""></option>
                <option value="1">Gerente</option>
                <option value="2">Director de obra</option>
                <option value="3">Capataz</option>
                <option value="4">Peon</option>
                <option value="5">Ayudante</option>
              </select>
            )}
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
        {crudType === "create" ? "Crear usuario" : "Editar usuario"}
      </button>
    </form>
  );
}
