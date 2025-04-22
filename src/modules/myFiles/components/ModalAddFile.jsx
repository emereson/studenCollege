import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../../utils/getToken";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
} from "@heroui/react";
import { inputClassNames } from "../../../utils/classNames";
import { toast } from "sonner";
import Loading from "../../../hooks/Loading";

const ModalAddFile = ({ dataClassroomId, isOpen, onOpenChange, findFiles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const submit = useCallback(
    (data) => {
      if (!file) {
        toast.error("Debes seleccionar un archivo.");
        return;
      }

      setLoading(true);

      const url = `${
        import.meta.env.VITE_URL_API
      }accessStudent/student-files/${dataClassroomId}`;
      const formData = new FormData();
      formData.append("name_student_file", data.name_student_file);
      formData.append("file", file);

      axios
        .post(url, formData, config)
        .then(() => {
          findFiles();
          reset();
          setFileName("");
          setFile(null);
          onOpenChange(false);
          toast.success("El archivo se subió correctamente.");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Hubo un error al subir el archivo.");
        })
        .finally(() => setLoading(false));
    },
    [dataClassroomId, onOpenChange, reset, file, findFiles]
  );

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error(
          "Solo se permiten imágenes (jpg, png, webp) y archivos PDF."
        );
        fileInputRef.current.value = "";
        setFile(null);
        setFileName("");
        return;
      }
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleClose = () => {
    reset();
    setFile(null);
    setFileName("");
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-base">
          Agregar nuevo archivo
        </ModalHeader>
        <ModalBody>
          {loading && <Loading />}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <Input
              isRequired
              className="w-full"
              classNames={inputClassNames}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              label="Título"
              placeholder="Escribe un título..."
              {...register("name_student_file", {
                required: "El título es obligatorio.",
              })}
              isInvalid={!!errors.name_student_file}
              color={errors.name_student_file ? "danger" : "primary"}
              errorMessage={errors.name_student_file?.message}
              radius="sm"
              size="sm"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Imagen o PDF</label>
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <Button
                  className="bg-amber-500 py-4 text-white"
                  type="button"
                  variant="bordered"
                  size="sm"
                  onPress={() => fileInputRef.current.click()}
                >
                  Seleccionar archivo
                </Button>
                <span className="text-sm truncate max-w-xs">
                  {fileName || "Ningún archivo seleccionado"}
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-end gap-3 p-4">
              <Button color="danger" type="button" onPress={handleClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddFile;
