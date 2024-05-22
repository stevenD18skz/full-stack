import React from "react";  
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//IMPORTACION DE PAGINAS
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ViewWork } from "./pages/ViewWork";

//CRUDS
import { CrudUsersPage } from "./pages/CrudUsersPage";
import { CrudWorkPage } from "./pages/CrudWorkPage";
import { CrudTaskPage } from "./pages/CrudTaskPage";
import { CrudProgressTaks } from "./pages/CrudProgessTaks";


import { DashBoardPage } from "./pages/DashBoardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/logIn" element={<LoginPage/>} />
        <Route path="/home"  element={<HomePage/>} />



      {/*
        direcciones para el Gerente
      */}
        <Route path="/crud-task"          element={<CrudTaskPage/>} />
        <Route path="/crud-users"         element={<CrudUsersPage/>} />
        <Route path="/crud-work"          element={<CrudWorkPage/>} />
        <Route path="/crud-task-progess"  element={<CrudProgressTaks/>} />
        <Route path="/dashboard"          element={<DashBoardPage/>} />
        <Route path="/obraVista/:obra" element={<ViewWork />} />

      {/*
        direcciones para el Director de obra
      */}


      </Routes>
    </BrowserRouter>
  )
}


export default App