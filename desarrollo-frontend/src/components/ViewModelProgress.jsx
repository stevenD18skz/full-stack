import React from "react";
import "../css/ModalView.css";
import { UserPhoto } from "./UserPhoto";

export default function ViewModalProgress({closeView, formData, setFormData, usuario}) {


  console.log(usuario)



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

          <center><h2 className="profile-name">Descripcion: {usuario.task_progress_description}</h2></center>
          <center><h2 className="profile-name">{usuario.task_progress_description}</h2></center>
          <center><h2 className="profile-name">{usuario.task_progress_description}</h2></center>
          <center><h2 className="profile-name">{usuario.task_progress_description}</h2></center>
          <center><h2 className="profile-name">{usuario.task_progress_description}</h2></center>
          <center><h2 className="profile-name">{usuario.task_progress_description}</h2></center>

          
          <center><button className="btn" onClick={closeView}>Cerrar</button></center>
          
          


      </div>
    </div>
  );
}

