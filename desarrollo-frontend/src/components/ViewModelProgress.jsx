import React from "react";
import "../css/ModalView.css";

export default function ViewModalProgress({closeView, formData, setFormData, usuario}) {
  return (
    <div className="modal">
      <div className="modal-content-view">
          <center><p className="about">Descripcion: {usuario.task_progress_description}</p></center>
          <center><p className="about">Requerimientos: {usuario.task_progress_needs}</p></center>
          <center><p className="about">Progreso: {usuario.task_progress}%</p></center>
          <center><button className="btn" onClick={closeView}>Cerrar</button></center>
      </div>
    </div>
  );
}

