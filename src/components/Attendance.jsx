import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./componentsStyle/attendance.css";
import axios from "axios";
import config from "../utils/getToken";
import Loading from "../hooks/Loading";

const Attendance = ({ setselectData, dataClassroomId }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = `${
      import.meta.env.VITE_URL_API
    }accessStudent/attendance/${dataClassroomId}`;

    axios
      .get(url, config)
      .then((res) => {
        setAttendance(res.data.attendances);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataClassroomId]);

  useEffect(() => {
    if (attendance?.length > 0) {
      setSelectedDate(new Date(attendance[attendance.length - 1]?.date));
    }
  }, [attendance]);

  const formatDate = (d) => d.toISOString().split("T")[0];

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const attendedDates = attendance?.filter((item) => {
        return item.date === formatDate(date);
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
      {loading && <Loading />}

      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
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
