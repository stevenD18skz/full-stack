import React, { useState, useEffect } from "react";
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
    "photo_user": null,
    "role_user": "Director de obra",
    "user_permissions": [3],
    "username": "ansoft",
  }

  console.log(usuario.first_name)

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeView}>
          X
        </span>
        <h1>{usuario.first_name}</h1>
      </div>
    </div>
  );
}