import React from "react";
import { Image } from "../Image/Image";
import { Text } from "../Text/Text";
import { Tooltip } from "../Tooltip/Tooltip";
import s from "./UserCard.module.scss";

export const UserCard = ({ user }) => {
  return (
    <div className={s.wrapper}>
      <Image image={user.photo} name={user.name} />
      <Text dots>{user.name}</Text>
      <div>
        <Text dots>{user.position}</Text>
        <Tooltip placement="bottom-start" title={user.email}>
          <Text className={s.dots} dots>
            {user.email}
          </Text>
        </Tooltip>
        <Text>{user.phone}</Text>
      </div>
    </div>
  );
};
