import React from "react";
import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const msgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }))
  .reverse();

function MsgList() {
  return (
    <ul className="messages">
      {msgs.map((el) => (
        <MsgItem key={el.id} {...el} />
      ))}
    </ul>
  );
}

export default MsgList;
