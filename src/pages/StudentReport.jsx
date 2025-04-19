import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../utils/getToken";
import Attendance from "../components/Attendance";
import Notes from "../components/Notes";
import Pays from "../components/Pays";
import Debts from "../components/Debts";
import Calendar from "../components/Calendar";
import Observation from "../components/Observation";
import "./pagesStyle/studentReport.css";
import Files from "../components/Files";

const StudentReport = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [dataStudent, setDataStudent] = useState(null);
  const [dataClassroomId, setDataClassroomId] = useState("");
  const [selectData, setSelectData] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const [classroomId, setClassroomId] = useState("");

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}accessStudent/${userData?.student?.id}`,
          config
        );
        const student = data.student;
        setDataStudent(student);
        const lastClassroom = student.classrooms_students.at(-1);
        if (lastClassroom) setDataClassroomId(lastClassroom.id);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    if (!dataStudent || !dataClassroomId) return;

    const classroom = dataStudent.classrooms_students.find(
      (c) => c.id === Number(dataClassroomId)
    );

    if (classroom) setClassroomId(classroom.classroom_id);
  }, [dataClassroomId, dataStudent]);
  console.log(classroomId);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}accessStudent/notifications`,
          config
        );
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notifications.length > previousNotificationCount) {
      setSelectData("notifications");
    }
    setPreviousNotificationCount(notifications.length);
  }, [notifications]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChangeClassroom = (e) => setDataClassroomId(e.target.value);

  return (
    <div className="studentReport__container">
      <section className="studentReport__section-one">
        <p onClick={handleLogout}>Cerrar Sesión</p>
        <img src={userData?.student?.studentImg} alt="Foto estudiante" />
        <h3>
          {userData?.student?.name} {userData?.student?.lastName}
        </h3>

        <select onChange={handleChangeClassroom} value={dataClassroomId}>
          {dataStudent?.classrooms_students.map((c) => (
            <option key={c.id} value={c.id}>
              {c.classroom.name} - {c.classroom.year}
            </option>
          ))}
        </select>
      </section>

      <section className="studentReport__section-two">
        {[
          {
            label: "REPORTE DE ASISTENCIA",
            value: "attendance",
            img: "./attendace.png",
          },
          { label: "REPORTE DE NOTAS", value: "notes", img: "./notes.png" },
          { label: "SUS PAGOS", value: "pays", img: "./pay.jpeg" },
          { label: "SUS DEUDAS", value: "debts", img: "./debt.png" },
          { label: "CALENDARIO", value: "calendar", img: "./calendar.png" },
          {
            label: "OBSERVACIONES",
            value: "observation",
            img: "./observation.png",
          },
        ].map(({ label, value, img }) => (
          <article key={value} onClick={() => setSelectData(value)}>
            <p>{label}</p>
            <img src={img} alt={label} />
          </article>
        ))}

        <article
          className="studentReport__section-two-notifications"
          onClick={() => setSelectData("notifications")}
        >
          <i className="bx bxs-bell-ring"></i>
          <h4>
            Alertas <span>{notifications.length}</span>
          </h4>
          <p>Se le notifica si hay nuevas alertas</p>
        </article>
        <article
          className="studentReport__section-two-archivos"
          onClick={() => setSelectData("archivos")}
        >
          <img src="./9746449.png" alt="" />
          <h4>Archivos</h4>
        </article>
      </section>

      {selectData === "notifications" && (
        <div className="notification__container">
          <i onClick={() => setSelectData("")} className="bx bxs-x-circle"></i>
          <article>
            {notifications.map((n) => (
              <div key={n.id}>
                <h3>{n.title}</h3>
                <img src={n.notificationImg} alt={n.title} />
              </div>
            ))}
          </article>
        </div>
      )}

      {selectData === "attendance" && (
        <Attendance
          setselectData={setSelectData}
          dataClassroomId={dataClassroomId}
        />
      )}
      {selectData === "notes" && (
        <Notes
          setselectData={setSelectData}
          dataClassroomId={dataClassroomId}
        />
      )}
      {selectData === "pays" && (
        <Pays setselectData={setSelectData} dataClassroomId={dataClassroomId} />
      )}
      {selectData === "debts" && (
        <Debts setselectData={setSelectData} data={dataStudent?.debts} />
      )}
      {selectData === "calendar" && <Calendar setselectData={setSelectData} />}
      {selectData === "observation" && (
        <Observation
          setselectData={setSelectData}
          data={dataStudent?.observations}
        />
      )}
      {selectData === "archivos" && (
        <Files setselectData={setSelectData} classroomId={classroomId} />
      )}
    </div>
  );
};

export default StudentReport;
