import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalTask({formData, setFormData, handleSubmit, crudType, objectModel = {}, id_padre}) {
  const [foreman, setForeman] = useState([]);
  const [workers, setWorkers] = useState([]);


  


  useEffect(() => {
    async function loadUsuarios() {
      const peticionForemans = await axios.get(`http://127.0.0.1:8000/crud/users/filtroPorRol/?roleBusqueda=Capataz`);
      setForeman(peticionForemans.data);

      const peticionWorkers  = await axios.get(`http://127.0.0.1:8000/crud/users/filtroPorRol/?roleBusqueda=trabajadores`);
      setWorkers(peticionWorkers.data)



      if(crudType == "edit"){
        console.log(objectModel)
        formData["task_name"] = objectModel.task_name
        formData["task_description"]  = objectModel.task_description
        formData["task_type"]     = objectModel.task_type
        formData["task_assignment_date"]    = objectModel.task_assignment_date
        formData["task_finish_date"]        = objectModel.task_finish_date
        formData["task_status"]        = objectModel.task_status
        formData["id_work"]        = objectModel.id_work
        formData["id_workers"]        = objectModel.id_workers
        formData["id_foreman"]        = objectModel.id_foreman
      } else{
        formData["task_name"] = ""
        formData["task_description"] = ""
        formData["task_type"] = ""
        formData["task_assignment_date"]    = ""
        formData["task_finish_date"]        = ""
        formData["task_status"] = 0
        formData["id_work"] = id_padre
        formData["id_workers"] = ""
        formData["id_foreman"] = peticionForemans.data[0].id
      }
    }
    loadUsuarios();
  }, []);





  const selectMultiple = (event) => {
    const newSelectedValues = Array.from(event.target.options) // Convert to array
      .filter((option) => option.selected) // Filter selected options
      .map((option) => option.value); // Extract values
    formData["id_workers"] = newSelectedValues
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
          {crudType === "create" ? "Crear tarea" : "Editar tarea"}{" "}
        </h3>




        <div className="grid grid-cols-2 gap-4 m-4">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="task_name"
              className="block mb-2 text-sm font-medium"
            >
              Nombre
            </label>
            <input
              type="text"
              name="task_name"
              id="task_name"
              value={formData.task_name}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create"
                  ? "Nombre de la tarea"
                  : objectModel.task_name
              }
              {...(crudType === "create" ? { required: true } : {})}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="task_type"
              className="block mb-2 text-sm font-medium"
            >
              Tipo
            </label>
            <input
              type="text"
              id="task_type"
              name="task_type"
              value={formData.task_type}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Tipo" : objectModel.task_type
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>
        </div>





        <div className="h-32 m-4">
          <label
            htmlFor="task_description"
            className="block mb-2 text-sm font-medium"
          >
            Descripción
          </label>
          <input
            type="text"
            id="task_description"
            name="task_description"
            value={formData.task_description}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full h-3/4 p-2.5"
            placeholder={
              crudType === "create"
                ? "Descripción"
                : objectModel.task_description
            }
            {...(crudType === "create" ? { required: true } : {})}
          ></input>
        </div>






        <div className="grid grid-cols-2 gap-4 m-4">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="task_assignment_date"
              className="block mb-2 text-sm font-medium"
            >
              Fecha de inicio
            </label>
            <input
              type="date"
              name="task_assignment_date"
              id="task_assignment_date"
              value={formData.task_assignment_date}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create"
                  ? "Fecha de inicio"
                  : objectModel.task_assignment_date
              }
              {...(crudType === "create" ? { required: true } : {})}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="task_finish_date"
              className="block mb-2 text-sm font-medium"
            >
              Fecha de finalización
            </label>
            <input
              type="date"
              name="task_finish_date"
              id="task_finish_date"
              value={formData.task_finish_date}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create"
                  ? "Fecha de inicio"
                  : objectModel.task_finish_date
              }
              {...(crudType === "create" ? { required: true } : {})}
            />
          </div>
        </div>






        <div className="grid grid-cols-2 gap-4 m-4">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="task_status"
              className="block mb-2 text-sm font-medium"
            >
              Etapa
            </label>


              <select
                id="task_status"
                name="task_status"
                value={formData.task_status}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value={0}>Pendiente</option>
                <option value={1}>En progreso</option>
                <option value={2}>Completada</option>
              </select>
          </div>



          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="id_foreman" className="block mb-2 text-sm font-medium">
              Capataz
            </label>
              <select
                id="id_foreman"
                name="id_foreman"
                value={formData.id_foreman}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                {foreman.map((item) => (
                  <option key={item.id} value={item.id}>{item.first_name}</option>
                ))}
              </select>
          </div>
        </div>





        <div className="flex flex-col items-center p-4 m-4 rounded">
          <label 
            htmlFor="select" 
            className="block mb-2 text-sm font-medium">
            Trabajadores
          </label>
          <select
            name="id_workers"
            id="id_workers"
            onChange={selectMultiple}
            className="border rounded w-full px-3 py-2 text-gray-900 text-sm bg-gray-50"
            multiple
          >
            {workers.map((item) => (
              <option key={item.id} value={item.id}>{item.first_name}</option>
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
        {crudType === "create" ? "Crear tarea" : "Editar tarea"}
      </button>
    </form>
  );
}
