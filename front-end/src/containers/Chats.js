import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { loadUserListAction } from "../actions/auth";
import { getChatsList } from "../actions/chat";
import Search from "../components/chats/search";

function Chats() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    dispatch(getChatsList());
    dispatch(loadUserListAction());
  }, []);

  const { socket } = useSelector((state) => state.socketReducer);
  const { chatsList } = useSelector((state) => state.chatReducer);
  const { userList, loggedUser } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (socket && loggedUser) {
      socket.emit("userConnectedToChat", {
        username: loggedUser.name,
        id: loggedUser.id,
      });

      socket.on("currentUsers", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });

      socket.on("userInChatIncrese", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });

      socket.on("userInChatDicrese", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });
    }
    return () => {
      if (socket && loggedUser) {
        socket.emit("userDisconectedFromChat", {
          username: loggedUser.name,
          id: loggedUser.id,
        });
        socket.off();
      }
    };
  }, [socket, loggedUser]);

  useEffect(() => {
    if (chatsList && userList) {
      const updatedChats = chatsList.forEach((chat) => {
        return userList.find((user) => user.id === chat.member);
      });
      setChats(updatedChats);
    }
  }, [chatsList, userList]);

  const createChatHandler = async (id) => {
    try {
      const isChatExist = chatsList.find((chat) => chat.member === id);
      if (!isChatExist) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
          },
        };

        const body = JSON.stringify({
          id,
        });

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/chat_duos/create/`,
          body,
          config
        );
        history.push(`chat/${res.data.id}`);
      } else {
        history.push(`chat/${isChatExist.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Search />
      {/* search a user to create a chat */}
      <div>
        {userList && userList.length > 0 ? (
          <>
            <h3>Friends:</h3>
            {userList &&
              userList.map((user) => {
                if (user.name !== loggedUser.name) {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => createChatHandler(user.id)}
                      key={user.id}
                    >
                      {user.name}
                    </li>
                  );
                }
              })}
          </>
        ) : (
          <>No Friends :(</>
        )}
      </div>
      {chats && chats.length > 0 ? (
        <>
          {chats.map((chat) => {
            <div key={chat.id}>
              <Link to={`/chats/chat/:${chat.id}`}>{chat.name}</Link>
              {Object.prototype.hasOwnProperty.call(onlineUsers, chat.name) && (
                <h6>online</h6>
              )}
            </div>;
          })}
        </>
      ) : (
        <p>No chats found... You should try create one</p>
      )}
    </>
  );
}

export default Chats;
