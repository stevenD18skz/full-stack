import React from "react";  
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Login } from "./pages/Login";
import { CrudUsersPage } from "./pages/CrudUsersPage";
import { HomePage } from "./pages/HomePages";
import { LogInPruebas } from "./pages/LogInPruebas";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/logIn'} />} />
        <Route path="/logIn" element={<Login/>} />
        <Route path="/crud-users" element={<CrudUsersPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/prueba" element={<LogInPruebas/>} />
      </Routes>
    </BrowserRouter>
  )
}


export default App