import React from "react";
import "./pagesStyle/home.css";

const Home = () => {
  return (
    <div className="home__container">
      <section className="home__section-one">
        <img src="./inicio.jpeg" alt="" />
        <article>
          <a
            href="http://bit.ly/informesymatriculas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-whatsapp"></i> Whatsapp
          </a>
          <a
            href="https://www.facebook.com/alipio.ponce.359"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-facebook-square"></i>Facebook
          </a>
          <a
            href="https://www.instagram.com/alipioponcesatipo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-instagram-alt"></i>Instagram
          </a>
          <a
            href="https://www.tiktok.com/@alipioponcesatipo?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-tiktok"></i>Tiktok
          </a>
          <a
            href="https://www.google.com/maps/place/Colegio+ALIPIO+PONCE+-+Satipo/@-11.2353135,-74.6397717,17z/data=!3m1!4b1!4m6!3m5!1s0x910bc119eeb6fd9d:0x181aefeb7fa019ca!8m2!3d-11.2353188!4d-74.6371968!16s%2Fg%2F11fjxfvnkd?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxs-map"></i>Maps
          </a>
        </article>
      </section>
      <section className="home__section-two">
        <article>
          <img src="./mision.jpeg" alt="" />
          <div>
            <h3>MISION</h3>
            <p>
              Cambiar la vida de nuestros estudiantes y colaboradores, formando
              jóvenes líderes, autónomos, disciplinados, responsables y
              respetuosos para servir a la sociedad
            </p>
          </div>
        </article>
        <article>
          <div>
            {" "}
            <h3>VISION</h3>
            <p>
              Ser el 2030 una institución líder a nivel regional con los más
              exigentes estándares de calidad, siendo reconocida por sus logros
              académicos, deportivos y culturales. Convirtiéndonos en el Alma
              mater de ciudadanos lideres en las diferentes ramas profesionales.
            </p>
          </div>
          <img src="./primary.jpeg" alt="" />
        </article>
      </section>
      <section className="home__section-one">
        <article>
          <a
            href="http://bit.ly/informesymatriculas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-whatsapp"></i> Whatsapp
          </a>
          <a
            href="https://www.facebook.com/alipio.ponce.359"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-facebook-square"></i>Facebook
          </a>
          <a
            href="https://www.instagram.com/alipioponcesatipo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-instagram-alt"></i>Instagram
          </a>
          <a
            href="https://www.tiktok.com/@alipioponcesatipo?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-tiktok"></i>Tiktok
          </a>
          <a
            href="https://www.google.com/maps/place/Colegio+ALIPIO+PONCE+-+Satipo/@-11.2353135,-74.6397717,17z/data=!3m1!4b1!4m6!3m5!1s0x910bc119eeb6fd9d:0x181aefeb7fa019ca!8m2!3d-11.2353188!4d-74.6371968!16s%2Fg%2F11fjxfvnkd?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxs-map"></i>Maps
          </a>
        </article>
      </section>
    </div>
  );
};

export default Home;
