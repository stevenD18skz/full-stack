import React from "react";  
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//IMPORTACION DE PAGINAS
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { HomePage } from "./pages/HomePage";
import { ViewWork } from "./pages/ViewWork";
import { ViewTasks } from "./pages/ViewTasks";

//CRUDS
import { CrudUsersPage } from "./pages/CrudUsersPage";
import { CrudWorkPage } from "./pages/CrudWorkPage";
import { CrudTaskPage } from "./pages/CrudTaskPage";
import { CrudProgresTasks } from "./pages/CrudProgessTaks";


import { DashBoardPage } from "./pages/DashBoardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/logIn" element={<LoginPage/>} />
        <Route path="/home"  element={<HomePage/>} />
        <Route path="/forgotPassword"  element={<ForgotPasswordPage/>} />
        <Route path="/resetPassword"  element={<ResetPasswordPage/>} />


      {/*
        direcciones para el Gerente
      */}
        <Route path="/crud-task"          element={<CrudTaskPage/>} />
        <Route path="/crud-users"         element={<CrudUsersPage/>} />
        <Route path="/crud-work"          element={<CrudWorkPage/>} />
        <Route path="/crud-task-progess"  element={<CrudProgresTasks/>} />
        <Route path="/dashboard"          element={<DashBoardPage/>} />
        <Route path="/obraVista/:obra"    element={<ViewWork />} />
        <Route path="/tareaVista/:tarea"    element={<ViewTasks />} />

      {/*
        direcciones para el Director de obra
      */}


      </Routes>
    </BrowserRouter>
  )
}


export default App