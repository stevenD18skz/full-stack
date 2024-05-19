import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalUsers({ formData, setFormData, handleSubmit, crudType, objectModel = {},}) {
  const [managers, setManagers] = useState([]);
  const [workers,  setWorkers]  = useState([]);


  useEffect(() => {
    async function loadUsers() {
      const response = await axios.get(`http://127.0.0.1:8000/users/`);
      setManagers(response.data.results);
      setWorkers(response.data.results)
    }
    loadUsers();
  }, []);






  const handeldChangeSelect = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  





  return (
    <form className="p-2 md:p-3" onSubmit={handleSubmit}>
      <div className="pb-8">


        <h3 className="pb-5 text-3xl">
          {crudType === "create" ? "Crear OBRA" : "Editar OBRA"}{" "}
        </h3>




        <div className="grid grid-cols-2 gap-4 m-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name_work" className="block mb-2 text-sm font-medium">
              Nombre de la obra
            </label>
            <input
              type="text"
              name="name_work"
              id="name_work"
              value={formData.name_work}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Nombre de la obra" : objectModel.name_work
              }
              {...(crudType === "create" ? { required: true } : {})}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="location_work"
              className="block mb-2 text-sm font-medium"
            >
              Localizacion
            </label>
            <input
              type="text"
              id="location_work"
              name="location_work"
              value={formData.location_work}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Localizacion" : objectModel.location_work
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>
        </div>


        <div className="h-32 m-4">
          <label
            htmlFor="description_work"
            className="block mb-2 text-sm font-medium"
          >
            Descripción
          </label>
          <input
            type="text"
            id="description_work"
            name="description_work"
            value={formData.description_work}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full h-3/4 p-2.5"
            placeholder={
              crudType === "create" ? "Descripción" : objectModel.description_work
            }
            {...(crudType === "create" ? { required: true } : {})}
          ></input>
        </div>


        <div className="grid grid-cols-2 gap-4 m-4">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="type_work"
              className="block mb-2 text-sm font-medium"
            >
              Tipo de la obra
            </label>
            <input
              type="text"
              name="type_work"
              id="type_work"
              value={formData.type_work}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Tipo de la obra" : objectModel.type_work
              }
              {...(crudType === "create" ? { required: true } : {})}
            />
          </div>



          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="id_manager_work" className="block mb-2 text-sm font-medium">
              Director de obra
            </label>
            {crudType === "create" ? (
              <select
                id="id_manager_work"
                name="id_manager_work"
                onChange={handeldChangeSelect}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                {managers.map((item) => (
                  <option key={item.id} value={item.id} >{item.first_name}</option>
                ))}
              </select>
            ) : (
              <select
                id="id_manager_work"
                name="id_manager_work"
                value={formData.id_manager_work}
                onChange={handeldChangeSelect}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                {managers.map((item) => (
                  <option key={item.id}>{item.first_name}</option>
                ))}
              </select>
            )}
          </div>
        </div>


        <div className="flex flex-col items-center p-4 m-4 rounded">
          <label 
            htmlFor="select" 
            className="block mb-2 text-sm font-medium">
            Trabajadores
          </label>
          <select
            name="id_user_work"
            id="id_user_work"
            onChange={handeldChangeSelect}
            className="border rounded w-full px-3 py-2 text-gray-900 text-sm bg-gray-50"
            multiple
          >
            {workers.map((item) => (
              <option value={item.id}>{item.first_name}</option>
            ))}
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
        {crudType === "create" ? "Crear obra" : "Editar obra"}
      </button>
    </form>
  );
}
