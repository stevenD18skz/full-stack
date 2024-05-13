import React, { useState, useEffect } from "react";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/ModalView.css";
import axios from "axios";
import { UserPhoto } from "../components/UserPhoto";

export default function ModalView({closeView, formData, setFormData, usuario}) {


  console.log(usuario)



  return (
    <div className="modal">
      <div className="modal-content">
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
          <center><p classname="about">{usuario.role_user}</p></center>
          <center><p classname="about">{usuario.email}</p></center>
          <center><p classname="about">{usuario.phone_user}</p></center>
          <center><p classname="about">{usuario.doc_type_user} {usuario.doc_number_user} </p></center>
          <center><p classname="about">{usuario.gender_user}</p></center>
          <center><p classname="about">{usuario.address_user}</p></center>
          <center><button classname="btn" onClick={closeView}>Cerrar</button></center>
        </div>
      </div>
    </div>
  );
}