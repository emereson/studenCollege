import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../utils/getToken";
import "./componentsStyle/files.css";
import Loading from "../hooks/Loading";
const Files = ({ setselectData, classroomId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const url = `${
      import.meta.env.VITE_URL_API
    }accessStudent/files/${classroomId}`;

    axios
      .get(url, config)
      .then((res) => {
        console.log(res);

        setFiles(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [classroomId]);

  return (
    <div className="files_container">
      {loading && <Loading />}

      <section className="attendance__section-one">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>ARCHIVOS</h3>
      </section>
      <section className="file_section_files">
        {files?.map((file) => (
          <a
            className="file_link"
            href={`${import.meta.env.VITE_IMAGE_URL}/${file.archivo_url}`}
            key={file.id}
            target="_blank"
          >
            <img src="./9746449.png" alt="" />
            <p>{file.name_archivo}</p>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Files;
