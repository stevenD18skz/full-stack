import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalView({closeView}) {

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeView}>
          X
        </span>
        <h1>olaaaaa</h1>
      </div>
    </div>
  );
}