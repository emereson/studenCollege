import React, { useState } from "react";
import "./componentsStyle/notes.css";

const Notes = ({ data, setselectData }) => {
  const [viewDataWeek, setviewDataWeek] = useState(false);
  const [viewSummary, setviewSummary] = useState(false);
  const [weekData, setweekData] = useState(null);
  const [summaryData, setsummaryData] = useState([]);

  const califications = () => {
    if (weekData && weekData.exams && weekData.exams.length > 0) {
      const totalNotes = weekData.exams.reduce(
        (total, exam) => total + parseFloat(exam.note),
        0
      );
      return totalNotes / weekData.exams.length;
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
        {data?.map((week) => (
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
                {weekData?.exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.name}</td>
                    <td>{exam.note}</td>
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
              <li
                style={{
                  border: "none",
                  position: "absolute",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <div className="note__statistics">
                  {summaryData?.map((data) => (
                    <div key={data.name}>
                      <span>
                        <p>{data.averageNote}</p>
                        <p>{data.name}</p>
                      </span>
                      <p
                        style={{
                          position: "absolute",
                          marginBottom: "2.5em",
                          width: "2em",
                          background: "skyblue",
                          height: `calc(4.9 * ${data.averageNote}%)`, // Utilizar data.averageNote en lugar de averageNote
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
              </li>{" "}
            </ul>
          </article>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
