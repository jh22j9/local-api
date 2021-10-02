import React from "react";
import MsgInput from "./MsgInput";

function MsgItem({
  id,
  userId,
  timestamp,
  text,
  onUpdate,
  onDelete,
  startEdit,
  isEditing,
}) {
  return (
    <li className="messages__item">
      <h3>
        {userId}{" "}
        <sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>

      {isEditing ? (
        <>
          <MsgInput mutate={onUpdate} text={text} id={id} />
        </>
      ) : (
        text
      )}
      <div className="messages__buttons">
        <button onClick={startEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </li>
  );
}

export default MsgItem;
