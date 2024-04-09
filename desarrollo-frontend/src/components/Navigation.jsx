import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="bg-gray-100 flex justify-between items-center px-6 py-3 shadow-md">
      <ul className="flex flex-grow">  {/* Added flex-grow property to ul */}
        <li className="mr-6">
          <Link to="/crud-users" className="relative text-gray-800 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gray-700 before:opacity-0 hover:before:opacity-20">
            CRUD DE USUARIOS
          </Link>
        </li>
        <li className="mr-auto">
          <Link to="/home" className="relative text-gray-800 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gray-700 before:opacity-0 hover:before:opacity-20">
            PAGINA PRINCIPAL
          </Link>
        </li>
        <li>
          <Link to="/logIn" className="relative text-gray-800 hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gray-700 before:opacity-0 hover:before:opacity-20">
            LOGOUT
          </Link>
        </li>
      </ul>
    </nav>

  );
}
