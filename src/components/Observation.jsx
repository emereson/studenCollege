import React from "react";
import "./componentsStyle/observations.css";
const Observation = ({ data, setselectData }) => {
  return (
    <div className="notes__container">
      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>OBSERVACIONES</h3>
      </section>
      <section className="observations__section-one">
        {data?.map((observation) => (
          <ul key={observation.id}>
            <li style={{ color: "var(--body-blue)", fontWeight: "600" }}>
              {observation.name}
            </li>
            <li>{observation.description}</li>
          </ul>
        ))}
      </section>
    </div>
  );
};
export default Observation;
