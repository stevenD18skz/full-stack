import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MdEmail } from "react-icons/md";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/");

        if (response.data && response.data.results) {
          setUsers(response.data.results);
        }
      } catch (error) {
        console.error("Error cargando los usuarios:", error);
      }
    }

    loadUsers();
  }, []);

  const verificate = () => {
    if (email.length === 0) {
      console.log("No se ingreso un correo electronico");
      Swal.fire({
        icon: "warning",
        title: "Correo electrónico requerido",
        text: "Ingresa tu correo electrónico para continuar",
      });
      return;
    }

    const userFound = users.find((user) => user.email === email);

    if (userFound) {
      console.log("Usuario encontrado:", userFound);
      /*Swal.fire({
        icon: "success",
        title: "Usuario encontrado",
        text: "Te enviaremos un email con las instrucciones",
      });
      return;
      */
      navigate("/resetPassword");
    } else {
      console.log("Usuario no encontrado en la plataforma");
      Swal.fire({
        icon: "error",
        title: "Usuario no encontrado",
        text: "El email ingresado no se encuentra vinculado a la plataforma",
      });
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-5xl font-semibold text-center">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="font-medium text-lg text-gray-600 mt-4 text-center">
          Ingresa tu correo electrónico para restablecerla
        </p>

        <div className="relative mt-6">
          <label className="font-extralight text-gray-600 block mb-2">
            Correo electrónico
          </label>
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 pl-10 pr-4 bg-transparent focus:border-indigo-500 focus:outline-none"
              placeholder="Ingresa tu correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <MdEmail className="text-indigo-400 h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-indigo-500 py-3 rounded-xl text-white text-lg font-semibold flex justify-center"
            onClick={verificate}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
