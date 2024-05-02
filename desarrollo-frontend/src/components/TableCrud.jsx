import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faUserMinus,
  faUserCheck,
  faCircleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";





export function TableCrud({ openEdit, index }) {
  const [dataList, setDataList] = useState([]);

  const data = {
    1: [
      ["ID", "Nombre", "Apellido", "Email", "Rol", "Estado", ""], //titulo para las columnas de la tabla
      "users", //
      ["id", "first_name", "last_name", "email", "role_user"], //nombre de los atributos que se mostraran en la tabla
      "is_active",
      "username",//atributo que usar el desabilitar para buscar el objeto
    ],
    2: [
      ["ID", "Nombre", "Ubicacion", "Tipo", "Descripcion", "Estado", ""],
      "obras",
      ["id", "name_work", "location_work", "type_work", 'description_work'],
      "habilitado",
      "name_work"
    ],
  };

  const titles = data[index][0];
  const dataName = data[index][1];

  useEffect(() => {
    async function load() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${dataName}/`
      );
      setDataList(response.data.results);
    }
    load();
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


  const disable = (disableObject) => {
    async function load() {
      console.log("Eliminar usuario con username:", disableObject[data[index][4]]);
      const objectName = disableObject[data[index][4]];
      axios.post("http://127.0.0.1:8000/inhabilitar/", {
        username: objectName,
      });
    }
    load();
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


  const enable = (enableObject) => {
    async function load() {
      console.log("Eliminar usuario con username:", enableObject[data[index][4]]);
      const objectName = enableObject[data[index][4]];
      axios.post("http://127.0.0.1:8000/habilitar/", {
        username: objectName,
      });
    }
    load();
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
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {titles.map((title) => (
            <th scope="col" className="px-6 py-3" key={title}>
              {title}
            </th>
          ))}
        </tr>
        
      </thead>
      <tbody>
        {dataList.map((currentObject) => (
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
                    className="icon-button px-6 py-4"
                    onClick={() => openEdit(currentObject)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ color: "#F3D21A" }}
                    />
                  </button>
                ) : (
                  <button type="button" className="icon-button px-6 py-4">
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
                    className="icon-button py-4"
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
                    className="icon-button py-4"
                    onClick={() => toastEnable(currentObject)}
                  >
                    <FontAwesomeIcon
                      icon={faUserCheck}
                      size="lg"
                      style={{ color: "#74C0FC" }}
                    />
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
