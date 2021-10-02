import { useState } from "react";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const initialMsgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }))
  .reverse();

const MsgList = () => {
  const [msgs, setMsgs] = useState(initialMsgs);
  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    // msgs.unshift(newMsg);
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((el) => (
          <MsgItem key={el.id} {...el} />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
