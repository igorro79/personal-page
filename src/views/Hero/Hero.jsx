import React from "react";
import { Container } from "../../components/Container/Container";
import igor from "../../img/photo.jpg";
import s from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={s.wrapper}>
      <Container>
        <div className={s.subwrapper}>
          <div className={s.textblock}>
            <h1>Hello! My name is Igor.</h1>
            <p>
              I'm a Full Stack developer with a strong desire to learn and to
              create new awsome applications ans services.
            </p>
          </div>
          <img className={s.photo} src={igor} alt="igor" />
        </div>
      </Container>
    </section>
  );
};
