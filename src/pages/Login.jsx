import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagesStyle/login.css";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}accessStudent/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const userDataJSON = JSON.stringify(res.data);
        localStorage.setItem("userData", userDataJSON);
        navigate("/");
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
        toast.error("DNI o contraseña incorrectas");
      });

    reset();
  };

  return (
    <div className="longin__container">
      <ToastContainer />
      <section className="login__section-one">
        <img src="/colegioLogo.png" alt="" />
        <h2>COLEGIO ALIPIO PONCE</h2>
      </section>
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <input
          {...register("dni")}
          id="dni"
          type="number"
          placeholder="Ingrese Numero CIP O DNI"
          required
        />

        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Igrese Su Contraseña"
          required
        />

        <button>INGRESAR</button>
      </form>

      <section className="login__section-two">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i className="bx bxs-phone"></i>Contáctenos
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i className="bx bxs-map"></i>Ubicanos
        </a>
      </section>
    </div>
  );
};

export default Login;
