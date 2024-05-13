import React from "react";
import { Navigation } from "../components/Navigation";


import axios from "axios";
import { useState, useEffect } from "react";


import { UserPhoto } from "../components/UserPhoto";



export function HomePage() {
  return (
    <div>
      <Navigation></Navigation>
      <h1 className="text-center">HOMEEEEEEEEEE</h1>
      <UserPhoto first_name="ana" last_name="sofia" x="20" y="20" z="text-4xl"></UserPhoto>
    </div>
  );
};