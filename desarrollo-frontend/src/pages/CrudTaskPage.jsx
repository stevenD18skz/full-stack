import { Navigation } from "../components/Navigation";
import "../css/CrudUsersStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { TableCrud } from "../components/TableCrud";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Modal.css";
import Swal from "sweetalert2";
import ModalUsers from "../components/ModalUsers";
import Modal from "../components/Modal";
import ModalView from "../components/ModalView";


export function CrudTaskPage() {
  return (
    <div>
      <Navigation></Navigation>
      <h1 className="text-center">taskssssss</h1>
    </div>
  );
};