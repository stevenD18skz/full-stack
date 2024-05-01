import React from "react";
import { Navigation } from "../components/Navigation";

import axios from "axios";
import { useState, useEffect } from "react";



export function HomePage() {

  const [userPhoto, setUserPhoto] = useState([]);
  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get("http://127.0.0.1:8000/api/users/1/");
      setUserPhoto(response.data);

      console.log(userPhoto.fotografia)

      
    }
    loadUsuarios();

  }, []);



  return (
    <div>
      <Navigation></Navigation>
      <h1 className="">HOMEEEEEEEEEE</h1>

      <img src={userPhoto.fotografia} alt="Foto del usuario" width="100" height="100"/>

      
      
    </div>
  );
};