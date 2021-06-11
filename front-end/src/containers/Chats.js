import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUserListAction } from "../actions/auth";
import { getChatsList } from "../actions/chat";
import Search from "../components/chats/search";
import FriendsList from "../components/chats/FriendList";
import ChatList from "../components/chats/ChatsList";

function Chats() {
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
      const updatedChats = chatsList.map((chat) => {
        return userList.find(
          (user) =>
            (user.id === chat.members[0] && user.id !== loggedUser.id) ||
            (user.id === chat.members[1] && user.id !== loggedUser.id)
        );
      });
      setChats(updatedChats);
    }
  }, [chatsList, userList]);

  return (
    <>
      <Search />
      {/* search a user to create a chat */}
      {userList && loggedUser && chatsList && (
        <FriendsList
          userList={userList}
          loggedUser={loggedUser}
          chatsList={chatsList}
        />
      )}
      {onlineUsers && <ChatList chats={chats} onlineUsers={onlineUsers} />}
    </>
  );
}
export default Chats;
