import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';


export function Login() {
  return (
    <div className='flex w-full h-screen'>
      <div className='hidden relative lg:flex h-full w-4/5 items-center justify-center overflow-hidden'>
        <img src='/images/background-login.jpg' className='object-cover'></img>
        <div className='absolute inset-0 bg-gradient-to-t from-black opacity-50'></div>
        <div className='absolute top-[40%] flex flex-col text-center'>
          <h2 className='text-4xl text-white font-bold tracking-wide my-4'>CONSTRUCTORA ÉLITE</h2>
          <p className='text-lg text-white italic font-normal'>Diseñamos tu visión, construimos tu realidad</p>
        </div>
      </div>

      <div className='w-full flex items-center justify-center lg:w-1/2 '>
        <div className='w-full flex flex-col items-center justify-center h-screen bg-white px-10 py-20 rounded-3xl'>
          <h1 className='text-5xl font-semibold'>¡Bienvenido!</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Ingresa tus datos para continuar</p>
          <div className='mt-8'>
            <div className="relative">
              <label className="text-lg font-medium">Usuario</label>
              <div className="relative">
                <input className="w-full border-2 border-gray-100 rounded-xl p-4 pl-10 pr-4 mt-1 bg-transparent focus:border-indigo-500 focus:outline-none" placeholder="Ingresa tu usuario" />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-indigo-400 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="text-lg font-medium">Contraseña</label>
              <div className="relative">
                <input className="w-full border-2 border-gray-100 rounded-xl p-4 pl-10 pr-4 mt-1 bg-transparent focus:border-indigo-500 focus:outline-none" placeholder="Ingresa tu contraseña" />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-indigo-400 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <button className='font-medium text-base text-indigo-800'>¿Olvidaste tu contraseña?</button>
            </div>
            <div className='mt-4 flex flex-col gap-y-4'>
              <Link to="/home" className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-indigo-500 py-3 rounded-xl text-white text-lg font-semibold flex justify-center">
                Iniciar sesión
              </Link>
              <div className='flex flex-col items-center justify-center gap-y-4'>
                <p className='text-gray-500'>O ingresa con tu correo electrónico</p>
                <button className='relative rounded-full w-16 h-16 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-white border-2 border-indigo-500 py-3 text-white text-lg font-semibold flex justify-center items-center'>
                  <div className="pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400" />
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