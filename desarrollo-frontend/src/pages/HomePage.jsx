import React from "react";
import { Navigation } from "../components/Navigation";


import axios from "axios";
import { useState, useEffect } from "react";


import { UserPhoto } from "../components/UserPhoto";



export function HomePage() {

  const [userPhoto, setUserPhoto] = useState([]);
  useEffect(() => {
    async function loadUsuarios() {
      const response = await axios.get("http://127.0.0.1:8000/api/users/1/");
      console.log(response.data)
      setUserPhoto(response.data.photo_user);
    }
    loadUsuarios();

  }, []);



  return (
    <div>
      <Navigation></Navigation>
      <h1 className="text-center">HOMEEEEEEEEEE</h1>
      <img src={userPhoto} alt="Foto del usuario" width="100" height="100"/>

      <UserPhoto></UserPhoto>

      
      
    </div>
  );
};