//tarea a la que pertenece task_progress_id_task
//descripcion task_progress_description -> text
//porcentaje  task_progres -> text
//fotos progress_photos -> image
//necesidades task_progress_needs -> text
//revision -> bool
//multimedia -> nose

//ya esta para descripcion pero para necesidades tambien?

/**
"id": 1,
"task_progress_description": "se restringio el area", 
"task_progress_needs": "se necesita material",
"progress_photos": null,
"task_progress": 10.0,
"inspection": false,
"task_progress_id_task": 1
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalTask({formData, setFormData, handleSubmit, crudType, objectModel = {}, id_padre}) {
  const [foreman, setForeman] = useState([]);

  useEffect(() => {
    async function loadUsuarios() {

      const peticionForemans = await axios.get(`http://127.0.0.1:8000/`);
      setForeman(peticionForemans.data);


      if(crudType == "edit"){
        console.log(objectModel)
        formData["task_progress_id_task"] = objectModel.task_progress_id_task
        formData["task_progress_description"] = objectModel.task_progress_description
        formData["task_progress_needs"] = objectModel.task_progress_needs
        formData["task_progress"] = objectModel.task_progress
        formData["inspection"] = objectModel.inspection
        formData["progress_photos"] = null
      } else{
        //atributos
        formData["task_progress_id_task"] = id_padre
        formData["task_progress_description"] = ""
        formData["task_progress_description"] = ""
        formData["task_progress_needs"] = ""
        formData["progress_photos"] = null//falta bine
        formData["task_progress"] = ""
        formData["inspection"] = false
      }
    }
    loadUsuarios();
  }, []);

  

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


        <h3 className="text-2xl font-semibold mb-6 text-blue-900">
          <center>{crudType === "create" ? "Añadir avances" : "Editar avances"}{" "}</center>
        </h3>

        <div className="h-32 m-4">
          <label
            htmlFor="task_progress_description"
            className="block mb-2 text-sm font-medium"
          >
            Descripción
          </label>
          <textarea 
            type="text"
            id="task_progress_description"
            name="task_progress_description"
            value={formData.task_progress_description}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full h-3/4 p-2.5"
            placeholder={
              crudType === "create"
                ? "Descripción"
                : objectModel.task_progress_description
            }
            {...(crudType === "create" ? { required: true } : {})}
          ></textarea>
        </div>




        <div className="h-32 m-4">
          <label
            htmlFor="task_progress_needs"
            className="block mb-2 text-sm font-medium"
          >
           Requerimientos para continuar la tarea

          </label>
          <textarea
            type="text"
            id="task_progress_needs"
            name="task_progress_needs"
            value={formData.task_progress_needs}
            onChange={handleChange}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full h-3/4 p-2.5"
            placeholder={
              crudType === "create"
                ? "Requerimientos"
                : objectModel.task_progress_needs
            }
            {...(crudType === "create" ? { required: true } : {})}
          ></textarea>
        </div>

        




        <div className="grid grid-cols-2 gap-4 m-4">
          <div>
            <label
              htmlFor="task_progress"
              className="block mb-2 text-sm font-medium"
            >
              Progreso
            </label>
            <input
              type="number"
              id="task_progress"
              name="task_progress"
              value={formData.task_progress}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create" ? "Progreso" : objectModel.task_progress
              }
              {...(crudType === "create" ? { required: true } : {})}
            ></input>
          </div>





          <div>
            <label
              htmlFor="inspection"
              className="block mb-2 text-sm font-medium"
            >
              Propuesto para revisión
            </label>
              <select
                id="inspection"
                name="inspection"
                value={formData.inspection}
                onChange={handleChange}
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-3"
              >
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
          </div>


        </div>

        
        
        <div className="mx-4">
          <div>
            <label
              htmlFor="progress_photos"
              className="block mb-2 text-sm font-medium"
            >
              Evidencias
            </label>
            <input
              type="file"
              name="progress_photos"
              id="progress_photos"
              value={formData.progress_photos}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder={
                crudType === "create"
                  ? "Recursos"
                  : objectModel.progress_photos
              }
            />
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
        {crudType === "create" ? "Crear avance" : "Editar avance"}
      </button>
    </form>
    
  );
}
