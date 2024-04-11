import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { NavCrudUsers } from './NavCrudUsers';



/*
EN REALIDAD ES UNA TABLA
*/
export function UsersList() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        async function loadUsuarios() {
            const response = await axios.get('http://127.0.0.1:8000/api/users/')
            const datosProyectos = response.data.results;
            setUsuarios(datosProyectos);
        }
        loadUsuarios()
    }, []);



    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        console.log('Searching for:', searchTerm);

        async function loadUsuarios() {
            const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/buscar/?nombre=${searchTerm}`)
            const datosProyectos = response.data;
            setUsuarios(datosProyectos);
        }

        async function loadAllUsuarios() {
            const res = await axios.get('http://127.0.0.1:8000/api/users/')
            const datosProyectos = res.data.results;
            setUsuarios(datosProyectos);
        }

        if (searchTerm == "") {
            loadAllUsuarios()
        }
        else {
            loadUsuarios()
        }
    };



    const saludar = () => {
        console.log(usuarios.email, 'hola mundo')
    }



    const handleEditClick = () => {
        console.log(usuarios.email, 'editar')
    }



    const handleEliminarClick = () => {
        console.log(usuarios.username, 'eliminar')
    }


    

    return (
        <div className="bg-slate-50 relative overflow-x-auto shadow-md sm:rounded-lg ">

            <div className="">
                
                <NavCrudUsers></NavCrudUsers>

                <div>
                    <button
                        type="button"
                        onClick={saludar}
                        className=" 
                        rounded-full text-sm px-3 py-2 text-center  font-semibold 
                        border-gray-600   text-white bg-gray-600
                        hover:text-white border hover:bg-gray-700 ">
                        <FontAwesomeIcon icon={faPlus} className="text-indigo-400 h-4 w-4" /> Agregar Usuario
                    </button>
                </div>

                <div className="bg-green-400 ">
                    <input
                        type="text"
                        id="table-search"
                        className="button-action p-2 text-sm rounded-lg w-80 bg-gray-200"
                        placeholder="Search for items"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </div>


            <hr class="border border-slate-200 border-solid my-6 w-full"/>


            <table className=" w-full  text-sm text-left rtl:text-right bg-slate-100">
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
                                <button
                                    type="button"
                                    className="icon-button px-6 py-4"
                                    onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#d1a60a" }} />
                                </button>
                                <button
                                    type="button"
                                    className="icon-button py-4"
                                    onClick={handleEliminarClick}>
                                    <FontAwesomeIcon icon={faUserMinus} size="lg" style={{ color: "#c80909" }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

