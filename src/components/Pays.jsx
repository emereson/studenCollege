import React, { useEffect, useState } from "react";
import "./componentsStyle/pays.css";
import axios from "axios";
import config from "../utils/getToken";
import formatDate from "../hooks/formatDate";

const Pays = ({ dataClassroomId, setselectData }) => {
  const [pays, setPays] = useState([]);
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }accessStudent/pays/${dataClassroomId}`;

    axios
      .get(url, config)
      .then((res) => {
        setPays(res.data.pays);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataClassroomId]);
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
        {pays?.map((pay) => (
          <div className="paySection__div" key={pay.id}>
            <ul>
              <li>{pay.name}</li>
              <li>Fecha de pago</li>
            </ul>
            <ul>
              <li>S/.{pay.amount}</li>
              <li>{formatDate(pay.date)}</li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pays;
