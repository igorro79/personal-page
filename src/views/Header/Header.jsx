import React from "react";
import { Auth } from "../../components/Auth/Auth";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import logo from "../../img/logo.png";
import s from "./Header.module.scss";

export const Header = ({ token, getUsers, getToken }) => {
  return (
    <header className={s.wrapper}>
      <Container>
        <div className={s.contentWrapper}>
          <img
            style={{ marginRight: "10px", width: "40px" }}
            src={logo}
            alt="logo"
          />
          <span>TESTTASK</span>
          <div className={s.buttonsWrapper}>
            <Button onClick={() => getUsers()} className={s.margin}>
              Users
            </Button>

            {token ? (
              <Auth />
            ) : (
              <Button onClick={() => getToken()}>Sign up</Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
