import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../utils/getToken";
import "./componentsStyle/calendar.css";

const Calendar = ({ setselectData }) => {
  const [calendars, setcalendars] = useState();
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}accessStudent/calendar`;

    axios
      .get(url, config)
      .then((res) => {
        setcalendars(res.data.calendars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="calendar__container">
      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>CALENDARIO</h3>
      </section>
      <section className="calendart__section-one">
        {calendars?.map((calendar) => (
          <article key={calendar.id}>
            <h3>{calendar.name}</h3>
            <img src={calendar.calendarImg} alt="" />
          </article>
        ))}
      </section>
    </div>
  );
};

export default Calendar;
