import React from "react";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";

import { Text } from "../../components/Text/Text";
import s from "./Hero.module.scss";

export const Hero = ({ getToken }) => {
  return (
    <section className={s.wrapper}>
      <div className={s.subwrapper}>
        <div className={s.textblock}>
          <Heading>Test assignment for front-end developer</Heading>
          <Text>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </Text>
        </div>
        <Button onClick={() => getToken()}>Sign up</Button>
      </div>
    </section>
  );
};
