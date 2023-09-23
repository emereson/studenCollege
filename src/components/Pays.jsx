import React from "react";
import "./componentsStyle/pays.css";

const Pays = ({ data, setselectData }) => {
  return (
    <div className="notes__container">
      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>SUS PAGOS</h3>
      </section>
      <section className="pays__section-one">
        <h4>
          {" "}
          <img src="./pay.jpeg" alt="" /> Mensualidades pagadas
        </h4>
        <article className="paySection-article-one">
          <div>
            {" "}
            <p>MES - AÑO</p>
            <p>Monto</p>
          </div>
        </article>
        {data?.map((pay) => (
          <div className="paySection__div" key={pay.id}>
            <ul>
              <li>{pay.name}</li>
              <li>Fecha de pago</li>
            </ul>
            <ul>
              <li>S/.{pay.amount}</li>
              <li>{pay.date}</li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pays;
