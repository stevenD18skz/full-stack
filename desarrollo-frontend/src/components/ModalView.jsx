import React, { useState, useEffect } from "react";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/ModalView.css";
import axios from "axios";

export default function ModalView({closeView}) {

  const usuario = {
    "address_user": "calle 22N",
    "date_joined": "2024-05-02T00:48:32Z",
    "doc_number_user": "1109662720",
    "doc_type_user": "CC",
    "email": "anasofi@gmail.com",
    "first_name": "ana",
    "gender_user": "F",
    "groups": [1],
    "id": 3,
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "last_login": null,
    "last_name": "cantillo",
    "password": "qwerty",
    "phone_user": "3187091429",
    "photo_user": "http://127.0.0.1:8000/media-files/imagenes/anaGato.jpeg",
    "role_user": "Director de obra",
    "user_permissions": [3],
    "username": "ansoft",
  }

  console.log(usuario.first_name)

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
          <div className="photo">
            <img src={usuario.photo_user} alt="Foto del usuario" className="profile"/>
          </div>
          <center><h2 className="profile-name">{usuario.first_name} {usuario.last_name}</h2></center>
          <center><p class="about">{usuario.role_user}</p></center>
          <center><button class="btn" onClick={closeView}>Cerrar</button></center>
        </div>
      </div>
    </div>
  );
}