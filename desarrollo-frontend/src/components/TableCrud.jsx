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





export function TableCrud({ openEdit, indice }) {
  const [listaDatos, setListaDatos] = useState([]);

  const datos = {
    1: [
      ["ID", "Nombre", "Apellido", "Email", "Rol", "Estado", ""],
      "users",
      ["id", "first_name", "last_name", "email", "rol"],
      "is_active"
    ],
    2: [
      ["ID", "Nombre", "Ubicacion", "Tipo", "Descripcion", "Estado", ""],
      "obras",
      ["id", "nombre", "ubicacion", "tipo", 'descripcion'],
      "habilitado"
    ],
  };

  const titulos = datos[indice][0];
  const nombre_dato = datos[indice][1];

  useEffect(() => {
    async function cargarUsuarios() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${nombre_dato}/`
      );
      setListaDatos(response.data.results);
    }
    cargarUsuarios();
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


  const Inhabilitar = (sol) => {
    async function loadUsuarios() {
      console.log("Eliminar usuario con username:", sol.username);
      const nombre_usuario = sol.username;
      axios.post("http://127.0.0.1:8000/inhabilitar/", {
        username: nombre_usuario,
      });
    }
    loadUsuarios();
  };

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


  const habilitar = (luna) => {
    async function loadUsuarios() {
      console.log("Eliminar usuario con username:", luna.username);
      const nombre_usuario = luna.username;
      axios.post("http://127.0.0.1:8000/habilitar/", {
        username: nombre_usuario,
      });
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
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {titulos.map((titulo) => (
            <th scope="col" className="px-6 py-3" key={titulo}>
              {titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listaDatos.map((usuario) => (
          <tr
            key={usuario.id}
            className="border-b border-gray-200 hover:bg-slate-200"
          >
            {datos[indice][2].map((item, i) => (
              <td
                key={i}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {usuario[item]}
              </td>
            ))}

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {usuario[datos[indice][3]] ? (
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
                {usuario[datos[indice][3]] ? (
                  <button
                    type="button"
                    className="icon-button px-6 py-4"
                    onClick={() => openEdit(usuario)}
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

                {usuario[datos[indice][3]] ? (
                  <button
                    type="button"
                    className="icon-button py-4"
                    onClick={() => toastInhabilitar(usuario)}
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
                    onClick={() => toastHabilitar(usuario)}
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
