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

export function TableCrud({ indice }) {
  const [listaDatos, setListaDatos] = useState([]);

  const datos = {
    1: [
      ["ID", "Nombre", "Apellido", "Email", "Rol", "Estado", ""],
      "users",
      ["id", "first_name", "last_name", "email", "rol"],
    ],
    2: [
      ["ID", "Nombre", "Ubicacion", "Tipo", "Descripcion", "Estado", ""],
      "obras",
      ["id", "nombre", "ubicacion", "tipo", 'descripcion'],
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


      console.log(response.data.results)



    }
    cargarUsuarios();
  }, []);


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
              {usuario.is_active ? (
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
                {usuario.is_active ? (
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

                {usuario.is_active ? (
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
