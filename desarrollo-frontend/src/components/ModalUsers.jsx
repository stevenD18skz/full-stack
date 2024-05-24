import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalUsers({ formData, setFormData, handleSubmit, crudType, usuario = {}, }) {
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    async function loadUsers() {
      const peticionRoles = await axios.get(`http://127.0.0.1:8000/roles/`);
      setRoles(peticionRoles.data.results);
      if(crudType == "edit"){
        formData["username"] = usuario.username
        formData["first_name"] = usuario.first_name
        formData["last_name"] = usuario.last_name
        formData["email"] = usuario.email
        formData["doc_type_user"] = usuario.doc_type_user
        formData["doc_number_user"] = usuario.doc_number_user
        formData["gender_user"] = usuario.gender_user
        formData["address_user"] = usuario.address_user
        formData["phone_user"] = usuario.phone_user

      } else{
        formData["username"] = ""
        formData["first_name"] = ""
        formData["last_name"] = ""
        formData["email"] = ""
        formData["doc_type_user"] = "CC"
        formData["doc_number_user"] = ""
        formData["gender_user"] = "M"
        formData["address_user"] = ""
        formData["phone_user"] = ""
        formData["role_user"] = "1"
      }
  }
    loadUsers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <form className="p-6 bg-white rounded-lg" onSubmit={handleSubmit}>



      <h3 className="text-2xl font-semibold mb-6 text-blue-900">
        {crudType === "create" ? <center>Creación de usuario</center> : <center>Editar usuario</center>}
      </h3>



      <div className="">


        <div>
          <label
            htmlFor="user"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Nombre de Usuario" : usuario.username
            }
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div>
          <label
            htmlFor="name"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Nombres
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Nombres" : usuario.first_name
            }
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div>
          <label
            htmlFor="last_name"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Apellidos" : usuario.last_name}
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div>
          <label
            htmlFor="email"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Correo electrónico" : usuario.email}
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div>
          <label
            htmlFor="identity"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Tipo de Identificación
          </label>

          <select
            id="doc_type_user"
           name="doc_type_user"
            value={usuario.doc_type_user}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
          >
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PA">Pasaporte</option>
          </select>
        </div>


        <div>
          <label
            htmlFor="user_id"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            N° Identificación
          </label>
          <input
            type="text"
            id="doc_number_user"
            name="doc_number_user"
            value={formData.doc_number_user}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create"
                ? "N° identificación"
                : usuario.doc_number_user
            }
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div>
          <label
            htmlFor="gender"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Género
          </label>

          <select
            id="gender_user"
            name="gender_user"
            value={formData.gender_user}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
          >
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
        </div>


        <div>
          <label
            htmlFor="phone"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Celular
          </label>
          <input
            type="phone"
            id="phone_user"
            name="phone_user"
            value={formData.phone_user}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Celular" : usuario.phone_user}
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>


        <div {...(crudType === "edit" ? { className : "col-span-2" } : {})}>
          <label
            htmlFor="adress"
            className="block mb-1text-sm font-semibold text-gray-700"
          >
            Dirección
          </label>
          <input
            type="address_user"
            id="address_user"
            name="address_user"
            value={formData.address_user}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-1.5 w-full"
            placeholder={
              crudType === "create" ? "Dirección" : usuario.address_user}
            {...(crudType === "create" ? { required: true } : {})}
          />
        </div>



          {crudType === "create" ? (
            <div>
              <label 
              htmlFor="rol" 
              className="block mb-1text-sm font-semibold text-gray-700" >
                ROL
              </label>
            <select
              id="role_user"
              name="role_user"
              value={formData.role_user}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
            >
              {roles.map((item) => (
                  <option key={item.id} value={item.id} >{item.name_role}</option>
                ))}


            </select>
            </div>

          ) : (
            <p></p>
          )}





      </div>



      <div className="flex justify-center w-100">
        <button
          type="submit"
          className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800 text-white"
        >
           {crudType === "create" ? "Crear usuario" : "Editar usuario"}
          
          <svg
            className="ml-1 me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

    </form>
  );
}
