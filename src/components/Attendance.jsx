import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./componentsStyle/attendance.css";

const Attendance = ({ data, setselectData }) => {
const [selectedDate, setSelectedDate] = useState();
  
useEffect(() => {
  if (data) {
    setSelectedDate(new Date(data[data?.length -1]?.date))
  }
}, [])

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const attendedDates = data?.filter((item) => {
        return item.date === date.toLocaleDateString("en-CA");
      });

      if (attendedDates?.length > 0) {
        return (
          <div className="attended-day">
            {attendedDates.map((item) => (
              <div
                className="attended-day-item"
                style={
                  item.status === "Puntual"
                    ? { background: "green" }
                    : item.status === "Tarde"
                    ? { background: "orange" }
                    : item.status === "Falta"
                    ? { background: "red" }
                    : { background: "skyblue" }
                }
                key={item.id}
              >
                {item.status}
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="attendance__container">
      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>REPORTE DE ASISTENCIA</h3>
      </section>
      <section className="attendance__section-two">
        <Calendar
          className="attendance__calendar"
          tileContent={tileContent}
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </section>
    </div>
  );
};

export default Attendance;
