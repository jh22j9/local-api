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
  const [editingId, setEditingId] = useState(null);
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

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((el) => (
          <MsgItem
            key={el.id}
            {...el}
            onUpdate={onUpdate}
            onDelete={() => onDelete(el.id)}
            startEdit={() => setEditingId(el.id)}
            isEditing={editingId === el.id}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
