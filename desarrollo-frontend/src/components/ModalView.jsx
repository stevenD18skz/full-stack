import React from "react";
import "../css/ModalView.css";
import { UserPhoto } from "../components/UserPhoto";

export default function ModalView({closeView, formData, setFormData, usuario}) {


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
        <div className ="card">
          <div className="photo-container">
            <div className="profile">
              <UserPhoto first_name={usuario.first_name} last_name={usuario.last_name} x="20" y="20" z="text-4xl"></UserPhoto>
            </div>
          </div>
          <center><h2 className="profile-name">{usuario.first_name.toUpperCase()} {usuario.last_name.toUpperCase()}</h2></center>
          <center><p className="about">{"Rol: " + usuario.role_user}</p></center>
          <center><p className="about">{"Correo Electronico: " + usuario.email}</p></center>
          <center><p className="about">{"Numero Telefónico: " + usuario.phone_user}</p></center>
          <center><p className="about">{"N° Identificación: " + usuario.doc_number_user} </p></center>
          <center><p className="about">{"Genero: " + usuario.gender_user}</p></center>
          <center><p className="about">{"Dirección: " + usuario.address_user}</p></center>
          <center><button className="btn" onClick={closeView}>Cerrar</button></center>
        </div>
      </div>
    </div>
  );
}