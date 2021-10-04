import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";
import fetcher from "../fetcher";

// const UserIds = ["roy", "jay"];
// const getRandomUserId = () => UserIds[Math.round(Math.random())];

// const initialMsgs = Array(50)
//   .fill(0)
//   .map((_, i) => ({
//     id: 50 - i,
//     userId: getRandomUserId(),
//     timestamp: 1234567890123 + (50 - i) * 1000 * 60,
//     text: `${50 - i} mock text`,
//   }));
// console.log(JSON.stringify(initialMsgs));

const MsgList = () => {
  const {
    query: { userId = "" },
  } = useRouter();
  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const onCreate = async (text) => {
    const newMsg = await fetcher("post", "./messages", { text, userId });
    if (!newMsg) throw Error("something wrong");

    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher("put", `/messages/${id}`, { text, userId });
    if (!newMsg) throw Error("something wrong");

    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDelete = async (id) => {
    const receivedId = await fetcher("delete", `/messages/${id}`, {
      params: { userId },
    });
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + "");
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  const getMessages = async () => {
    const msgs = await fetcher("get", "/messages");
    setMsgs(msgs);
  };

  useEffect(() => {
    getMessages();
  }, []);

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
            myId={userId}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
