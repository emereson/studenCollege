import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pagesStyle/navigation.css";

const Navigation = ({ userData }) => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <nav className="navigation__container">
      <div onClick={() => setshowMenu(false)}>
        <Link to="/">
          {" "}
          <img src="/colegioLogo.png" alt="" />
        </Link>
      </div>

      <ul className={`navigation__ul ${!showMenu ? "shomMenu" : ""}`}>
        <li onClick={() => setshowMenu(false)}>
          <Link to="/">CONÓCENOS</Link>
        </li>
        <li onClick={() => setshowMenu(false)}>
          <Link to="/niveles">NIVELES</Link>
        </li>
        <li onClick={() => setshowMenu(false)}>
          <Link to="/galeria-fotos">GALERIA DE FOTOS</Link>
        </li>
        <li onClick={() => setshowMenu(false)}>
          <Link to="/reporte-estudiante">REPORTE DEL ESTUDIANTE</Link>
        </li>
      </ul>
      <section className="navigation__section-one">
        {!showMenu ? (
          <i onClick={() => setshowMenu(true)} className="bx bx-menu"></i>
        ) : (
          <i onClick={() => setshowMenu(false)} className="bx bxs-x-circle"></i>
        )}
      </section>
    </nav>
  );
};

export default Navigation;
