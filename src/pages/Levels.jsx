import React from "react";
import "./pagesStyle/levels.css";

const Levels = () => {
  return (
    <div className="levels__container">
      <section>
        <article>
          <h3>Primaria</h3>
          <p>
            En este nivel los estimulamos a tener confianza en sí mismos, a
            pensar de manera independiente y asumir responsabilidades de sus
            propias acciones.
          </p>
          <h4>Vacantes: 5to y 6to</h4>
        </article>
        <img src="./primary.jpeg" alt="" />
      </section>
      <section>
        <img src="./secundary.jpeg" alt="" />
        <article>
          <h3>Secundaria</h3>
          <p>
            En este nivel, los estudiantes consolidan los conocimientos
            adquiridos con un método de aprendizaje intensivo de Matemáticas,
            Ciencias y Letras. Adquiriendo hábitos de estudio, disciplina y
            valores.
          </p>
          <h4>Vacantes: 1ro al 5to</h4>
        </article>
      </section>
    </div>
  );
};

export default Levels;
