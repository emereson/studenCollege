import React from "react";
import "./hooksStyle/Loading.css";
const Loading = () => {
  return (
    <div className="Loading">
      <i className="bx bx-loader-circle bx-spin bx-rotate-90"></i>
      <h1>Cargando ...</h1>
    </div>
  );
};

export default Loading;
