import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../utils/getToken";
import Loading from "../../hooks/Loading";
import { Button, useDisclosure } from "@heroui/react";
import ModalAddFile from "./components/ModalAddFile";

const MyFiles = ({ setselectData, dataClassroomId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState(null);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const findFiles = () => {
    setLoading(true);

    const url = `${
      import.meta.env.VITE_URL_API
    }accessStudent/student-files/${dataClassroomId}`;

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
  };

  useEffect(() => {
    findFiles();
  }, [dataClassroomId]);

  const handleAddFile = () => {
    setSelectModal("add_file");
    onOpen();
  };
  console.log(dataClassroomId);

  return (
    <div className="fixed bg-white left-0 min-h-[100%] w-screen  flex flex-col ">
      {loading && <Loading />}

      <section className="attendance__section-one py-4">
        <p onClick={() => setselectData("")}>
          {" "}
          <i className="bx bx-chevrons-left"></i> atras
        </p>
        <h3>MIS ARCHIVOS</h3>
      </section>
      <div className="w-full pt-16 ">
        <div className="w-full flex justify-end p-2">
          <Button className="bg-black text-white py-6" onPress={handleAddFile}>
            Agregar Archivo
          </Button>
          {selectModal === "add_file" && (
            <ModalAddFile
              dataClassroomId={dataClassroomId}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              findFiles={findFiles}
            />
          )}
        </div>
        <section className="w-full flex  items-center justify-center">
          {files?.map((file) => (
            <a
              className="file_link"
              href={`${import.meta.env.VITE_IMAGE_URL}/${file.file_url}`}
              key={file.id}
              target="_blank"
            >
              <img src="./9746449.png" alt="" />
              <p>{file.name_student_file}</p>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MyFiles;
