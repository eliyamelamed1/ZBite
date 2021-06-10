import React from "react";
import { Link } from "react-router-dom";

function ChatsList({ chats = [], onlineUsers }) {
  return (
    <div>
      {chats.length > 0 ? (
        <>
          {chats.map((chat) => {
            console.log(chat);
            return (
              <div key={chat.id}>
                <Link to={`/chats/chat/:${chat.id}`}>{chat.name}</Link>
                {Object.prototype.hasOwnProperty.call(
                  onlineUsers,
                  chat.name
                ) && <h6>online</h6>}
              </div>
            );
          })}
        </>
      ) : (
        <p>No chats found... You should try create one</p>
      )}
      );
    </div>
  );
}

export default ChatsList;
