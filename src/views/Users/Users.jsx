import React from "react";
import { Heading } from "../../components/Heading/Heading";
import { UserCard } from "../../components/UserCard/UserCard";

import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import s from "./Users.module.scss";
const Users = ({ isLoading, users, addUsers, noMoreUsers }) => {
  return (
    <section>
      <Container>
        <Heading tag="h2">Working with GET request</Heading>
        {users.length > 0 && (
          <>
            <div className={s.grid}>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            <Button
              className={s.showMoreButton}
              status={noMoreUsers}
              onClick={() => addUsers()}
            >
              Show more
            </Button>
          </>
        )}
        {isLoading && (
          <div className={s.loader}>
            <CircularProgress disableShrink />
          </div>
        )}
      </Container>
    </section>
  );
};
export default Users;
