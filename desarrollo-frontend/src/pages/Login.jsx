import React from 'react';
import axios from 'axios';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const verificate = async () => {

        try {

            if (username.length == 0 | password.length == 0 | username.length > 30) {
                setError(true)
            }

            else {
                const response = await axios.post("http://localhost:8000/login/", {
                    username,
                    password
                });
                setError(false)
                navigate("/home");
            }


        } catch (error) {
            console.log("NO PUDE HACER EL POST");
            console.error(error.message);
        }
    }

    return (
        <div className='flex w-full h-screen'>

            <div className='hidden relative lg:flex h-full w-4/5 items-center justify-center overflow-hidden'>
                <img src='./images/background-login.jpg' />
                <div className='absolute inset-0 bg-gradient-to-t from-black opacity-50'></div>
                <div className='absolute top-[40%] flex flex-col text-center'>
                    <h2 className='text-4xl text-white font-bold tracking-wide my-4'>CONSTRUCTORA ÉLITE</h2>
                    <p className='text-lg text-white italic font-normal'>Diseñamos tu visión, construimos tu realidad</p>
                </div>
            </div>

            <div className='w-full flex items-center justify-center lg:w-1/2 '>
                <div className='w-full flex flex-col items-center justify-center h-screen bg-white px-10 py-20 rounded-3xl'>

                    <h1 className='text-5xl font-semibold'>¡Bienvenido!</h1>
                    <p className='font-medium text-lg text-gray-600 mt-4'>Ingresa tus datos para continuar</p>

                    <div className='mt-8'>


                        <div className="relative">
                            <label className="font-extralight text-gray-600 ">Usuario</label>
                            <div className="relative mb-4">
                                <input
                                    type='text'
                                    className="w-full border-2 border-gray-100 rounded-xl p-4 pl-10 pr-4 mt-1 bg-transparent focus:border-indigo-500 focus:outline-none"
                                    placeholder="Ingresa tu usuario"
                                    onChange={(e) => setUsername(e.target.value)} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <FaUser className="text-indigo-400 h-4 w-4" />
                                </div>
                            </div>
                        </div>


                        <div className="relative">
                            <label className="my-4 font-extralight text-gray-600">Contraseña</label>
                            <div className="relative">
                                <input
                                    type='password'
                                    className="w-full border-2 border-gray-100 rounded-xl p-4 pl-10 pr-4 mt-1 bg-transparent focus:border-indigo-500 focus:outline-none"
                                    placeholder="Ingresa tu contraseña"
                                    onChange={(e) => setPassword(e.target.value)} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <RiLockPasswordFill className="text-indigo-400 h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {error ?
                            <div className='mt-4 flex items-center justify-center'>
                                <p className='font-medium text-base text-red-600'>El usuario o la contraseña no es válido</p>
                            </div>
                            :
                            <div className='mt-1 flex items-center justify-center'>
                                <p className='font-medium text-base text-red-600'></p>
                            </div>
                        }


                        <div className='mt-4 flex items-center justify-center'>
                            <button className='font-medium text-base text-indigo-800'>¿Olvidaste tu contraseña?</button>
                        </div>


                        <div className='mt-4 flex flex-col gap-y-4'>
                            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-indigo-500 py-3 rounded-xl text-white text-lg font-semibold flex justify-center"
                                onClick={verificate}>
                                Iniciar sesión
                            </button>
                            <div className='flex flex-col items-center justify-center gap-y-4'>
                                <p className='text-gray-600'>O ingresa con tu correo electrónico</p>
                                <button className='relative rounded-full w-12 h-12 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-white border-2 border-indigo-500 py-3 text-white text-lg font-semibold flex justify-center items-center'>
                                    <div className="pointer-events-none">
                                        <FaGoogle className='text-indigo-400 h-4 w-4' />
                                    </div>
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>



        </div>
    )
}