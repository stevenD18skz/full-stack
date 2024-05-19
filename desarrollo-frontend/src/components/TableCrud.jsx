import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUserMinus,
  faUserCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";



export function TableCrud({ openEdit, index, openView, searchTerm, filtredTerm}) {
  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);

  const data = {
    1: [
      ["ID", "Nombre", "Apellido", "Email", "Rol", "Estado", ""], //titulo para las columnas de la tabla
      "http://127.0.0.1:8000/users/", //la url de la peticoin total
      ["id", "first_name", "last_name", "email", "role_user"], //nombre de los atributos que se mostraran en la tabla
      "is_active",
      "username",//atributo que usar el desabilitar para buscar el objeto
    ],
    2: [
      ["ID", "Nombre", "Ubicacion", "Tipo", "Descripcion", "Estado", ""],
      "http://127.0.0.1:8000/works/",
      ["id", "name_work", "location_work", "type_work", 'description_work'],
      "enabled_work",
      "name_work"
    ],
      3: [
      ["ID", "Nombre", "Descripcion", "Tipo", "Etapa", "Estado", ""],
      `http://127.0.0.1:8000/crud/task/filtroObra/?obra=${filtredTerm}`,
      ["id", "task_name", "task_description", "task_type", 'task_status'],
      "task_enabled",
      "task_name"
    ]
  };

  const titles = data[index][0];
  const dataName = data[index][1];






  useEffect(() => {
    async function loadUsers() {
      console.log(filtredTerm)
      const response = await axios.get(
        dataName
      );
      console.log(response)
      setDataList(response.data.results);
    }
    loadUsers();
  }, [filtredTerm]);





  
  useEffect(() => {
    const filteredData = dataList.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredDataList(filteredData);
  }, [searchTerm, dataList]);





  
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


  async function disable(disableObject) {
    async function postDisable() {
      const objectId = disableObject[data[index][2][0]];
      await axios.put(`http://127.0.0.1:8000/crud/${dataName}/change/`, {
        id: objectId,
        action: 'inhabilitar',
      });
    }

    async function loadUsers() {
      const response = await axios.get(
        `http://127.0.0.1:8000/${dataName}/`
      );
      setDataList(response.data.results)
    }
    
    async function handleDisable() {
      const result = await postDisable();
      loadUsers()
    }
    handleDisable()



  };

  const toastDisable = (disableObject) => {
    Swal.fire({
      title: `¿Estás seguro que quieres desactivar a ${disableObject[data[index][4]]}?`,
      text: "No podrá acceder a la plataforma",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, inhabilitar",
    }).then((result) => {
      if (result.isConfirmed) {
        disable(disableObject);
        Toast.fire({
          icon: "success",
          title: "Usuario inhabilitado con éxito",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "No fue posible inhabilitar al usuario",
        });
      }
    });
  };





  
  async function enable(enableObject) {
    async function postEnable() {
      const objectId = enableObject[data[index][2][0]];
      axios.put(`http://127.0.0.1:8000/crud/${dataName}/change/`, {
        id: objectId,
        action: 'habilitar'
      });
    }
    
    async function loadUsers() {
      const response = await axios.get(
        `http://127.0.0.1:8000/${dataName}/`
      );
      setDataList(response.data.results)
    }
    
    async function handleDisable() {
      const result = await postEnable();
      loadUsers()
    }
    handleDisable()
  };

  const toastEnable = (enableObject) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a habilitar a ${enableObject[data[index][4]]}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        enable(enableObject);
        Toast.fire({
          icon: "success",
          title: "Usuario habilitado con éxito",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "El usuario continuará inhabilitado",
        });
      }
    });
  };





  return (
    <table className="w-full text-sm text-left rtl:text-right ">
      <thead className="text-xs bg-gray-50 dark:bg-gray-700 text-white">
        <tr>
          {titles.map((title) => (
            <th scope="col" className="px-6 py-3" key={title}>
              {title}
            </th>
          ))}
        </tr>
        
      </thead>
      <tbody>
        {filteredDataList.map((currentObject) => (
          <tr
            key={currentObject.id}
            className="border-b border-gray-200 hover:bg-slate-200"
          >
            {data[index][2].map((item, i) => (
              <td
                key={i}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {currentObject[item]}
              </td>
            ))}

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {currentObject[data[index][3]] ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Habilitado
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                  Inhabilitado
                </div>
              )}
            </td>


            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>
                {currentObject[data[index][3]] ? (
                  <button
                    type="button"
                    className="icon-button p-4"
                    onClick={() => openEdit(currentObject)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ color: "#F3D21A" }}
                    />
                  </button>
                ) : (
                  <button type="button" className="icon-button p-4">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ color: "#645F5D" }}
                    />
                  </button>
                )}

                {currentObject[data[index][3]] ? (
                  <button
                    type="button"
                    className="icon-button p-4"
                    onClick={() => toastDisable(currentObject)}
                  >
                    <FontAwesomeIcon
                      icon={faUserMinus}
                      size="lg"
                      style={{ color: "#F22828" }}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="icon-button p-4"
                    onClick={() => toastEnable(currentObject)}
                  >
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      size="lg"
                      style={{ color: "#74C0FC" }}
                    />
                  </button>
                )}

                {currentObject[data[index][3]] ? (
                 <button
                 type ="button"
                 className="icon-button p-4"
                 onClick={() => openView(currentObject)}
                  >
                  <FontAwesomeIcon 
                  icon={faEye}
                  size="lg"
                  style={{color: "#6e4398",}} />
                  </button>  
                ) : (
                  <button
                  type="button"
                  className="icon-button p-4"
                  >
                    <FontAwesomeIcon
                    icon={faEye}
                    size="lg"
                    style={{color: "#645F5D",}}/>
                  </button>  
                )}

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
