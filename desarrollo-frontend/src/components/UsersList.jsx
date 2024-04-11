import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faUserMinus } from '@fortawesome/free-solid-svg-icons';



/*
EN REALIDAD ES UINA TABLA
*/
export function UsersList() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    console.log('pagina cargada')
    async function loadUsuarios() {
      const res = await axios.get('http://127.0.0.1:8000/api/users/')
      const datosProyectos = res.data.results;
      setUsuarios(datosProyectos);
    }
    loadUsuarios()
  }, []);



  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('Searching for:', searchTerm);

    async function loadUsuarios() {
      const res = await axios.get('http://127.0.0.1:8000/api/users/')
      const datosProyectos = res.data.results;
      setUsuarios(datosProyectos);
    }

    loadUsuarios()
  };


  
  const saludar = () => {
    console.log(usuarios.email, 'hola mundo')
  }


  return (
    <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">

      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 bg-red-600">

        <div>
          <button
            type="button"
            onClick={saludar}
            className="text-gray-900 hover:text-white border hover:bg-gray-700 font-semibold rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600">
            <FontAwesomeIcon icon={faPlus} className="text-indigo-400 h-4 w-4" /> Agregar Usuario
          </button>
        </div>

        <div className="relative">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="button-action block p-2 ps-10 text-sm rounded-lg w-80 dark:bg-gray-200"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>

      </div>



      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nombres
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-b border-gray-200 hover:bg-slate-200">

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.first_name || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.last_name || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.email || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.rol || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.is_active ?
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Activo
                  </div>
                  :
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Inhabilitado
                  </div>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#d1a60a", paddingRight: 30, }} />
                <FontAwesomeIcon icon={faUserMinus} size="lg" style={{ color: "#c80909", }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}