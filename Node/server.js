const express = require("express");

const { addUser, removeUser, findUser } = require("./utils/roomActions");

const {
  addUserToChatRoom,
  removeUserFromChatRoom,
} = require("./utils/chatRoomActions");

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT);

const io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("user-joined", async ({ id, name }) => {
    const users = await addUser(id, socket.id, name);
    socket.emit("user-joined-successfully", users);
    console.log("*:", users);
  });

  socket.on("userConnectedToChat", async ({ username, id }) => {
    const onlineUsers = await addUserToChatRoom(id, socket.id, username);
    console.log(onlineUsers);

    socket.emit("currentUsers", { onlineUsers });

    socket.broadcast.emit("userInChatIncrese", {
      onlineUsers,
    });
  });

  socket.on("userDisconectedFromChat", async ({ username }) => {
    const onlineUsers = await removeUserFromChatRoom(username);

    socket.broadcast.emit("userInChatDicrese", { onlineUsers });
  });

  socket.on("new-message", async ({ sender, receiver, text }) => {
    console.log("newMessage:", sender, receiver, text);
    const socketId = findUser(receiver).socketId;

    if (socketId) {
      socket.to(socketId).emit("message-received", { sender, text });
    }
  });

  socket.on("user-disconnected", async () => {
    await removeUser(socket.id);
    console.log("socket-disconnected");
  });
});
