import React from "react";
import "../css/ModalView.css";

export default function ViewModalProgress({ closeView, formData, setFormData, usuario }) {
  const imageUrl = usuario.progress_photos ? `${usuario.progress_photos}` : null;

  return (
    <div className="modal">
      <div className="modal-content-view">
        <center><p className="about">Descripción: {usuario.task_progress_description}</p></center>
        <center><p className="about">Requerimientos: {usuario.task_progress_needs}</p></center>
        <center><p className="about">Progreso: {usuario.task_progress}%</p></center>
        
        {imageUrl && (
          <center>
            <img src={imageUrl} alt="Evidencia del progreso" className="rounded-lg shadow-lg max-w-full h-auto align-middle border-none" />
          </center>
        )}

        <center><button className="btn" onClick={closeView}>Cerrar</button></center>
      </div>
    </div>
  );
}
