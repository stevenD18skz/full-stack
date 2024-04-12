import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Modal.css';


/*
EN REALIDAD ES UINA TABLA
*/
export function UsersList() {
    const [usuarios, setUsuarios] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        async function loadUsuarios() {
            const response = await axios.get('http://127.0.0.1:8000/api/users/')
            const datosProyectos = response.data.results;
            setUsuarios(datosProyectos);
        }
        loadUsuarios()
    }, []);



    const openModal = () => {
        setIsOpen(true);
    };



    const closeModal = () => {
        setIsOpen(false);
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



    const handleEliminarClick = (usuario) => { // Pass the entire user object
        console.log("Eliminar usuario con username:", usuario.username); // Access username
    };


    return (
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <>
                {isOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    {/* <h3>Crear Usuario</h3> */}
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Nombre de Usuario:</label>
                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Type product name" required />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium">Price</label>
                                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="$2999" required />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium">Category</label>
                                        <select id="category" name="category" value={formData.category} onChange={handleChange} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                            <option value="">Select category</option>
                                            <option value="TV">TV/Monitors</option>
                                            <option value="PC">PC</option>
                                            <option value="GA">Gaming/Console</option>
                                            <option value="PH">Phones</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium ">Product Description</label>
                                        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 dark:placeholder-gray-400" placeholder="Write product description here" />
                                    </div>
                                </div>
                                <button type="submit" className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    Add new product
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                <div>
                    <button type="button" onClick={openModal} className="text-gray-900 hover:text-white border hover:bg-gray-700 font-semibold rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600">
                        <FontAwesomeIcon icon={faPlus} className="text-indigo-400 h-4 w-4" /> Agregar Usuario
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
                                {usuario.is_active || '-'}
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
                                    className="icon-button px-6 py-4"
                                    onClick={() => handleEliminarClick(usuario)} // Pass user object
                                >
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
