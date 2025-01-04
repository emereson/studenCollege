import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../utils/getToken";
import Attendance from "../components/Attendance";
import "./pagesStyle/studentReport.css";
import Notes from "../components/Notes";
import Pays from "../components/Pays";
import Debts from "../components/Debts";
import Calendar from "../components/Calendar";
import Observation from "../components/Observation";
import Loading from "../hooks/Loading";

const StudentReport = () => {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const [dataStudent, setdataStudent] = useState();
  const [dataClassroomId, setDataClassroomId] = useState();
  const [dataClassroom, setDataClassroom] = useState();
  const [loading, setLoading] = useState(false);

  const [selectData, setselectData] = useState();
  const [notifications, setnotifications] = useState([]);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}accessStudent/${
      userData?.student?.id
    }`;

    axios
      .get(url, config)
      .then((res) => {
        setdataStudent(res.data.student);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}accessStudent/notifications`;

    axios
      .get(url, config)
      .then((res) => {
        setnotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (notifications.length > previousNotificationCount) {
      setselectData("notifications");
    }
    setPreviousNotificationCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    if (dataClassroomId > 0) {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_URL_API
      }accessStudent/classroom/${dataClassroomId}`;

      axios
        .get(url, config)
        .then((res) => {
          console.log(res);

          setDataClassroom(res.data.classroom);
        })
        .catch((err) => {
          setDataClassroom();
        })
        .finally(() => setLoading(false));
    }
  }, [dataClassroomId]);

  console.log(dataClassroom);

  return (
    <div className="studentReport__container">
      {loading && <Loading />}
      <section className="studentReport__section-one">
        <p
          onClick={() => {
            localStorage.clear();

            window.location.reload();
          }}
        >
          Cerrar Sesión
        </p>
        <img src={userData?.student?.studentImg} alt="" />
        <h3>
          {userData?.student?.name} {userData?.student?.lastName}
        </h3>
        <select
          onChange={(e) => setDataClassroomId(e.target.value)}
          name=""
          id=""
        >
          <option value="">seleccione un aula</option>
          {dataStudent?.classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </section>

      <section className="studentReport__section-two">
        <article onClick={() => setselectData("attendance")}>
          <p>REPORTE DE ASISTENCIA </p> <img src="./attendace.png" alt="" />
        </article>
        <article onClick={() => setselectData("notes")}>
          <p>REPORTE DE NOTAS</p> <img src="./notes.png" alt="" />
        </article>
        <article onClick={() => setselectData("pays")}>
          <p>SUS PAGOS</p> <img src="./pay.jpeg" alt="" />
        </article>
        <article onClick={() => setselectData("debts")}>
          <p>SUS DEUDAS </p> <img src="./debt.png" alt="" />
        </article>
        <article onClick={() => setselectData("calendar")}>
          <p>CALENDARIO</p> <img src="./calendar.png" alt="" />
        </article>
        <article onClick={() => setselectData("observation")}>
          <p>OBSERVACIONES </p> <img src="./observation.png" alt="" />
        </article>
        <article
          className="studentReport__section-two-notifications"
          onClick={() => setselectData("notifications")}
        >
          <i className="bx bxs-bell-ring"></i>
          <h4>
            Alertas <span>{notifications?.length}</span>
          </h4>
          <p>Se le notifica si hay nuevas alertas</p>
        </article>
      </section>
      {selectData === "notifications" ? (
        <div className="notification__container">
          <i onClick={() => setselectData("")} className="bx bxs-x-circle"></i>
          <article>
            {notifications?.map((notification) => (
              <div key={notification.id}>
                <h3>{notification.title}</h3>
                <img src={notification.notificationImg} alt="" />
              </div>
            ))}
          </article>
        </div>
      ) : (
        ""
      )}

      {selectData === "attendance" ? (
        <Attendance
          setselectData={setselectData}
          data={dataClassroom?.attendances}
        />
      ) : (
        ""
      )}
      {selectData === "notes" ? (
        <Notes setselectData={setselectData} data={dataClassroom?.courses} />
      ) : (
        ""
      )}

      {selectData === "pays" ? (
        <Pays setselectData={setselectData} data={dataClassroom?.payments} />
      ) : (
        ""
      )}

      {selectData === "debts" ? (
        <Debts setselectData={setselectData} data={dataStudent?.debts} />
      ) : (
        ""
      )}
      {selectData === "calendar" ? (
        <Calendar setselectData={setselectData} />
      ) : (
        ""
      )}
      {selectData === "observation" ? (
        <Observation
          setselectData={setselectData}
          data={dataStudent?.observations}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default StudentReport;
