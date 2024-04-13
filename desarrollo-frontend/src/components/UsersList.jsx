import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faUserMinus, faUserCheck, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Modal.css';
import Swal from "sweetalert2";

export function UsersList() {
    const [usuarios, setUsuarios] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const [isDisable, setisDisable] = useState(false);
    const [isEnable, setisEnable] = useState(false);
    const [eliminate, setEliminate] = useState([]);
    const [availible, setAvailible] = useState([]);


    useEffect(() => {
        async function loadUsuarios() {
            const response = await axios.get('http://127.0.0.1:8000/api/users/')
            setUsuarios(response.data.results);
        }
        loadUsuarios()
    }, []);



    const openModal = () => {
        setIsOpen(true);
    };



    const closeModal = () => {
        setIsOpen(false);
    };



    const openConfirmation = (user) => {
        setisDisable(true);
        setEliminate([user])
        console.log(eliminate)
    };

    const closeConfirmation = () => {
        setisDisable(false);
    };


    const openConf = (user) => {
        setisEnable(true);
        setAvailible([user])
        console.log(eliminate)
    };

    const closeConf = () => {
        setisEnable(false);
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };



    const filteredUsers = usuarios.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const handleEditClick = (e) => {
        console.log('editara');
    };



    const handleInhabilitarClick = () => { // Pass the entire user object
        console.log("Eliminar usuario con username:", eliminate[0].username); // Access username
        const nombre_usuario = eliminate[0].username
        const response = axios.post('http://127.0.0.1:8000/inhabilitar/', {
            "username": nombre_usuario
        })

        async function loadUsuarios() {
            const response = await axios.get('http://127.0.0.1:8000/api/users/')
            setUsuarios(response.data.results);
        }
        loadUsuarios()

        closeConfirmation()
    };


    const handleHabilitarClick = () => {
        console.log("Eliminar usuario con username:", availible[0].username); // Access username
        const nombre_usuario = availible[0].username
        const response = axios.post('http://127.0.0.1:8000/habilitar/', {
            "username": nombre_usuario
        })

        const responseU = axios.get('http://127.0.0.1:8000/api/users/')
        setUsuarios(responseU.data.results);

        closeConf()
    };


    return (
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <>
                {isOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: "#113778", }} />
                            </span>
                            <form className="p-4 md:p-5" onSubmit={handleSubmit}>{
                                /**
                                 * username
                                 * nombre
                                 * apellidos
                                 * Dirección de correo electrónico:
                                 * Fotografia: (tal vez)
                                 * Tipo identificacion:
                                 * Nro identificacion:
                                 * Genero:
                                 * Direccion:
                                 * Celular:
                                 */
                            }
                                <div className="gap-4 mb-4 grid-cols-2">
                                    {/* <h3>Crear Usuario</h3> */}
                                    <div className="col-span-2">
                                        <label htmlFor="user" className=" block mb-2 text-sm font-medium">Nombre de Usuario</label>
                                        <input type="text" name="user" id="user" value={formData.user} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5" placeholder="Nombre de Usuario" required />
                                    </div>
                                    <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Nombres</label>
                                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nombres" required />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Apellidos</label>
                                            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Apellidos" required>
                                            </input>
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo Electrónico</label>
                                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5" placeholder="Correo Electrónico" required>
                                        </input>
                                    </div>
                                    <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="identity" className="block mb-2 text-sm font-medium">Tipo de Identificación</label>
                                            <select id="identity" name="identity" value={formData.identity} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                <option value=""></option>
                                                <option value="CC">Cédula de Ciudadania</option>
                                                <option value="CE">Cédula de Extranjeria</option>
                                                <option value="PA">Pasaporte</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="user_id" className="block mb-2 text-sm font-medium">N° Identificación</label>
                                            <input type="text" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="N° Identificación" required>
                                            </input>
                                        </div>
                                    </div>
                                    <div className="m-4 grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="gender" className="block mb-2 text-sm font-medium">Género</label>
                                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                <option value=""></option>
                                                <option value="FE">Femenino</option>
                                                <option value="MA">Masculino</option>
                                                <option value="NB">No Binario</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium">Teléfono</label>
                                            <input type="phone" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Teléfono" required>
                                            </input>
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium">Dirección</label>
                                        <input type="address" id="address" name="phone" value={formData.address} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-11/12 p-2.5" placeholder="Dirección" required>
                                        </input>
                                    </div>

                                </div>
                                <button type="submit" className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800 text-white">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg> Crear Usuario
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                <div>
                    <button type="button" onClick={openModal} className="text-gray-900 hover:text-white border hover:bg-gray-700 font-semibold rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600">
                        <FontAwesomeIcon icon={faPlus} className="text-indigo-400 h-4 w-4" /> Crear Usuario
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="button-action block p-2 ps-10 text-sm rounded-lg w-80 dark:bg-gray-200"
                        placeholder="Search for items"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredUsers.map((usuario) => (
                        <tr key={usuario.id} className="border-b border-gray-200 hover:bg-slate-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
                                    </div>
                                }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>
                                    {usuario.is_active ?
                                        <button
                                            type="button"
                                            className="icon-button px-6 py-4"
                                            onClick={() => handleEditClick(usuario)}>
                                            <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#F3D21A" }} />
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            className="icon-button px-6 py-4">
                                            <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#645F5D" }} />
                                        </button>
                                    }

                                    {usuario.is_active ?
                                        <button
                                            type="button"
                                            className="icon-button py-4"
                                            onClick={() => openConfirmation(usuario)}
                                        >
                                            <FontAwesomeIcon icon={faUserMinus} size="lg" style={{ color: "#F22828" }} />
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            className="icon-button py-4"
                                            onClick={() => openConf(usuario)}>
                                            <FontAwesomeIcon icon={faUserCheck} size="lg" style={{ color: "#74C0FC", }} />
                                        </button>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {isDisable && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeConfirmation}>
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#000000", }} />
                        </span>
                        <h3 className="mb-5 text-lg font-normal text-gray-800">
                            ¿Éstas seguro que deseas inhabilitar este usuario?
                        </h3>
                        <button onClick={handleInhabilitarClick}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Sí, inhabilitar
                        </button>
                        <button onClick={closeConfirmation}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            No, cancelar
                        </button>
                    </div>
                </div>
            )}

            {isEnable && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeConf}>
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#000000", }} />
                        </span>
                        <h3 className="mb-5 text-lg font-normal text-gray-800">
                            ¿Éstas seguro que deseas habilitar este usuario?
                        </h3>
                        <button onClick={handleHabilitarClick}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white border-blue-700 dark:bg-blue-500 dark:hover:bg-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Sí, habilitar
                        </button>
                        <button onClick={closeConf}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            No, cancelar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}



