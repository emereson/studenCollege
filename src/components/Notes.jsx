import React, { useEffect, useState } from "react";
import "./componentsStyle/notes.css";
import axios from "axios";
import config from "../utils/getToken";
import Loading from "../hooks/Loading";

const Notes = ({ setselectData, dataClassroomId }) => {
  const [exams, setExams] = useState([]);
  const [viewDataWeek, setviewDataWeek] = useState(false);
  const [viewSummary, setviewSummary] = useState(false);
  const [weekData, setweekData] = useState(null);
  const [summaryData, setsummaryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const url = `${
      import.meta.env.VITE_URL_API
    }accessStudent/exams/${dataClassroomId}`;

    axios
      .get(url, config)
      .then((res) => {
        setExams(res.data.exams);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataClassroomId]);

  const califications = () => {
    if (weekData && weekData.courses && weekData.courses.length > 0) {
      const totalNotes = weekData.courses.reduce(
        (total, exam) => total + parseFloat(exam.note),
        0
      );
      const average = totalNotes / weekData.courses.length;
      // Redondear la calificación promedio a dos decimales
      const roundedAverage = average.toFixed(2);
      return roundedAverage;
    }
    return 0;
  };

  const allCalifications = () => {
    const lastFiveData = data?.slice(-5);

    const allNotes = lastFiveData?.map((summary) => {
      const name = summary.name;
      const notes = summary.exams.map((exam) => parseFloat(exam.note));
      const totalNotes = notes.reduce((total, note) => total + note, 0);
      const averageNote = totalNotes / notes.length;

      return { name: name, averageNote: averageNote };
    });

    setsummaryData(allNotes);
  };

  return (
    <div className="notes__container">
      {loading && <Loading />}

      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>REPORTE DE NOTAS</h3>
      </section>
      <section className="notes__section-one">
        <p
          onClick={() => {
            setviewSummary(true);
            allCalifications();
          }}
        >
          RESUMEN
        </p>
      </section>
      <section className="notes__section-two">
        {exams?.map((week) => (
          <p
            onClick={() => {
              setviewDataWeek(true);
              setweekData(week);
            }}
            key={week.id}
          >
            {week.name}
          </p>
        ))}
      </section>
      {viewDataWeek ? (
        <section className="notes__section-three">
          <i
            onClick={() => {
              setviewDataWeek(false);
              setweekData(null);
            }}
            className="bx bxs-x-circle"
          ></i>
          <article>
            <table>
              <thead>
                <tr>
                  <th>Nota</th>
                  <th>{califications()}</th>
                </tr>
              </thead>
              <tbody>
                {weekData?.courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>
                      {course.note === "20"
                        ? "A"
                        : course.note === "10"
                        ? "B"
                        : "C"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      ) : (
        ""
      )}
      {viewSummary ? (
        <section className="notes__viewSummary">
          <i
            onClick={() => {
              setviewSummary(false);
            }}
            className="bx bxs-x-circle"
          ></i>
          <article>
            <ul>
              <li>20</li>
              <li>18</li>
              <li>16</li>
              <li>14</li>
              <li>12</li>
              <li>10</li>
              <li>08</li>
              <li>06</li>
              <li>04</li>
              <li>02</li>
              <li>00</li>
              <li>start</li>
            </ul>
            <div className="note__statistics">
              {summaryData?.map((data) => (
                <div key={data.name}>
                  <div className="note__statistics__p">
                    <p>{data.averageNote.toFixed(2)}</p>
                    <p>{data.name}</p>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      bottom: "1em",
                      width: "2em",
                      background: "skyblue",
                      height: `calc(4.8 * ${data.averageNote}%)`, // Utilizar data.averageNote en lugar de averageNote
                    }}
                  ></p>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
