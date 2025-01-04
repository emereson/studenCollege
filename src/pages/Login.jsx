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
        navigate("/reporte-estudiante");
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
        <a
          href="http://bit.ly/informesymatriculas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxs-phone"></i>Contáctenos
        </a>
        <a
          href="https://www.google.com/maps/place/Colegio+ALIPIO+PONCE+-+Satipo/@-11.2353135,-74.6397717,17z/data=!3m1!4b1!4m6!3m5!1s0x910bc119eeb6fd9d:0x181aefeb7fa019ca!8m2!3d-11.2353188!4d-74.6371968!16s%2Fg%2F11fjxfvnkd?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxs-map"></i>Ubicanos
        </a>
      </section>
    </div>
  );
};

export default Login;
