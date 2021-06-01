import React, { useState } from "react";
import { useSelector } from "react-redux";

function MessageForm({ sender, receiver }) {
  const { socket } = useSelector((state) => state.socketReducer);
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("new-message", {
        sender,
        receiver,
        text,
      });
    }

    setText("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="message"
        placeholder={`write to ${receiver}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}

export default MessageForm;
