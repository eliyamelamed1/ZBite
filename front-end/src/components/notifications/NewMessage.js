import React from "react";
import { useSelector } from "react-redux";

import MessageForm from "./MessageForm";

function NewMessage({ sender, text, setShowPopup, setMessageReceivied }) {
  const { loggedUser } = useSelector((state) => state.authReducer);

  return (
    <div
      style={{
        height: "5rem",
        width: "10rem",
        position: "absolute",
        top: "30px",
        right: "30px",
      }}
    >
      <h1
        onClick={() => {
          setShowPopup(false);
          setMessageReceivied(null);
        }}
        style={{ cursor: "pointer" }}
      >
        X
      </h1>
      <h3>you got a message from:{sender}</h3>
      <p>{text}</p>
      <MessageForm sender={loggedUser.name} receiver={sender} />
    </div>
  );
}

export default NewMessage;
