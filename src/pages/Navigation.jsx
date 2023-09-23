import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pagesStyle/navigation.css";

const Navigation = ({ userData }) => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <nav className="navigation__container">
      <div>
        <img src="/colegioLogo.png" alt="" />
      </div>

      <ul className={`navigation__ul ${!showMenu ? "shomMenu" : ""}`}>
        <li>
          <Link to="/">CONÓCENOS</Link>
        </li>
        <li>
          <Link to="/niveles">NIVELES</Link>
        </li>
        <li>
          <Link to="/galeria-fotos">GALERIA DE FOTOS</Link>
        </li>
        <li>
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
