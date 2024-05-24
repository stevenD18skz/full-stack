import React from "react";
import "../css/ModalView.css";
import { UserPhoto } from "./UserPhoto";

export default function ViewModalProgress({closeView, formData, setFormData, usuario}) {


  console.log(usuario)

  /**
"id": 1,
"task_progress_description": "se restringio el area", 
"task_progress_needs": "se necesita material",
"progress_photos": null,
"task_progress": 10.0,
"inspection": false,
"task_progress_id_task": 1
*/



  return (
    <div className="modal">
      <div className="modal-content-view">
        {/* <span className="close" onClick={closeView}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            style={{ color: "#6e4398" }}
          />
        </span> */}

          <center><p className="about">Descripcion: {usuario.task_progress_description}</p></center>
          <center><p className="about">Requerimientos: {usuario.task_progress_needs}</p></center>
          <center><p className="about">Progreso: {usuario.task_progress}%</p></center>
          {/*<center><p className="about">Propuesto para revisión: {usuario.inspection}</p></center>*/}
          
          <center><button className="btn" onClick={closeView}>Cerrar</button></center>
          
          


      </div>
    </div>
  );
}

