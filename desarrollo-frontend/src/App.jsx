import React from "react";  
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//IMPORTACION DE PAGINAS
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ViewWork } from "./pages/ViewWork";
import { ViewTasks } from "./pages/ViewTasks";

//CRUDS
import { CrudUsersPage } from "./pages/CrudUsersPage";
import { CrudWorkPage } from "./pages/CrudWorkPage";
import { CrudTaskPage } from "./pages/CrudTaskPage";
import { CrudProgresTasks } from "./pages/CrudProgessTaks";


import { DashBoardPage } from "./pages/DashBoardPage";
import { ChartUserRole } from "./components/ChartUserRole";
import { ChartUserGender } from "./components/ChartUserGender";
import { ChartUserStatus } from "./components/ChartUserStatus";
import { ChartWorkLocation } from "./components/ChartWorkLocation";
import { ChartWorkType } from "./components/ChartWorkType";
import { ChartWorkStatus } from "./components/ChartWorkStatus";
import { ChartTaskType } from "./components/ChartTaskType";
import { ChartTaskStatus } from "./components/ChartTaskStatus";
import { ChartTaskState } from "./components/ChartTaskState";
import { ChartProgressTask } from "./components/ChartProgressTask";
import { ChartProgressTaskStatus } from "./components/ChartProgressTaskStatus";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/logIn" element={<LoginPage/>} />
        <Route path="/home"  element={<HomePage/>} />
        <Route path="/chartUserRole"  element={<ChartUserRole/>} />
        <Route path="/chartUserGender"  element={<ChartUserGender/>} />
        <Route path="/chartUserStatus"  element={<ChartUserStatus/>} />
        <Route path="/charWorkLocation"  element={<ChartWorkLocation/>} />
        <Route path="/charWorkType"  element={<ChartWorkType/>} />
        <Route path="/charWorkStatus"  element={<ChartWorkStatus/>} />
        <Route path="/chartTaskType"  element={<ChartTaskType/>} />
        <Route path="/chartTaskStatus"  element={<ChartTaskStatus/>} />
        <Route path="/chartTaskState"  element={<ChartTaskState/>} />
        <Route path="/chartProgressTask"  element={<ChartProgressTask/>} />
        <Route path="/chartProgressTaskStatus"  element={<ChartProgressTaskStatus/>} />

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