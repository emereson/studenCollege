import React from "react";
import "./componentsStyle/debts.css";

const Debts = ({ data, setselectData }) => {
  console.log(data);
  return (
    <div className="notes__container">
      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>SUS DEUDAS</h3>
      </section>
      <section className="pays__section-one">
        <h4>PAGOS PENDIENTES</h4>
        <article className="paySection-article-one">
          <div>
            {" "}
            <p>CONCEPTO</p>
            <p>Monto</p>
          </div>
        </article>
        {data?.map((pay) => (
          <ul key={pay.id} className="debts__ul">
            <li>{pay.name}</li>
            <li>S/.{pay.amount}</li>
          </ul>
        ))}
      </section>
    </div>
  );
};

export default Debts;
