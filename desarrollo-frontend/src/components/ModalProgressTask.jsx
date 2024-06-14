import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalTask({ formData, setFormData, handleSubmit, crudType, objectModel = {}, id_padre }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function loadUsuarios() {
      const peticionForemans = await axios.get(`http://127.0.0.1:8000/crud/users/filtroPorRol/?roleBusqueda=Capataz`);
      //setForeman(peticionForemans.data);

      if (crudType === "edit") {
        console.log(objectModel);
        setFormData({
          ...formData,
          task_progress_id_task: objectModel.task_progress_id_task,
          task_progress_description: objectModel.task_progress_description,
          task_progress_needs: objectModel.task_progress_needs,
          progress_photos: objectModel.progress_photos,
          task_progress: objectModel.task_progress,
          inspection: objectModel.inspection
        });
      } else {
        setFormData({
          ...formData,
          task_progress_id_task: id_padre,
          task_progress_description: "",
          task_progress_needs: "",
          progress_photos: "",
          task_progress: "",
          inspection: 0
        });
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("task_progress_id_task", formData.task_progress_id_task);
    formDataToSend.append("task_progress_description", formData.task_progress_description);
    formDataToSend.append("task_progress_needs", formData.task_progress_needs);
    formDataToSend.append("task_progress", formData.task_progress);
    formDataToSend.append("inspection", formData.inspection);
    if (file) {
      formDataToSend.append("progress_photos", file);
    }

    // Ajusta la URL según corresponda para la creación o edición
    const url = crudType === "create"
      ? "http://127.0.0.1:8000/progress/"
      : `http://127.0.0.1:8000/progress/${objectModel.id}/`;

    console.log(`URL: ${url}`);
    console.log(`crudType: ${crudType}`);
    console.log(`objectModel.id: ${objectModel.id}`);

    try {
      await axios({
        method: crudType === "create" ? "post" : "put",
        url: url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Manejar la respuesta según sea necesario
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <form className="p-2 md:p-3" onSubmit={handleFormSubmit}>
      <div className="pb-8">
        <h3 className="text-2xl font-semibold mb-6 text-blue-900">
          <center>{crudType === "create" ? "Crear avances" : "Editar avances"}{" "}</center>
        </h3>
        <div className="h-32 m-4">
          <label htmlFor="task_progress_description" className="block mb-1text-sm font-semibold text-gray-700">
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
          <label htmlFor="task_progress_needs" className="block mb-1text-sm font-semibold text-gray-700">
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
            <label htmlFor="task_progress" className="block mb-1text-sm font-semibold text-gray-700">
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
            <label htmlFor="inspection" className="block mb-1text-sm font-semibold text-gray-700">
              Propuesto para revisión
            </label>
            <select
              id="inspection"
              name="inspection"
              value={formData.inspection}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-3"
            >
              <option value={0}>Si</option>
              <option value={1}>No</option>
            </select>
          </div>
        </div>
        <div className="mx-4">
          <div>
            <label htmlFor="progress_photos" className="block mb-1text-sm font-semibold text-gray-700">
              Evidencias
            </label>
            <input
              type="file"
              name="progress_photos"
              id="progress_photos"
              onChange={handleFileChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-100">
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
      </div>
    </form>
  );
}
