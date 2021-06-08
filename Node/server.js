const express = require("express");

const {
  addUser,
  removeUser,
  findUser,
  addUserToChatRoom,
  removeUserFromChatRoom,
  findOnlineUsers,
  removeAllUsers,
} = require("./utils/roomActions");

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT);

const io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("user-joined", ({ id, name }) => {
    const users = addUser(id, socket.id, name);
    io.to(socket.id).emit("user-joined-successfully", users);
    console.log("*:", users);
  });

  socket.on("userConnectedToChat", ({ username, id }) => {
    const error = addUserToChatRoom(id, socket.id, username);

    if (!error) {
      const onlineUsers = findOnlineUsers();
      console.log(onlineUsers);
      socket.emit("currentUsers", { onlineUsers });
      socket.broadcast.emit("userInChatIncrese", { onlineUsers });
    }
    //
    else {
      socket.to(socket.id).emit("failedAddingUserToChat");
    }
  });

  socket.on("userDisconectedFromChat", ({ username }) => {
    const error = removeUserFromChatRoom(username);

    if (!error) {
      const onlineUsers = findOnlineUsers();
      console.log(onlineUsers);
      socket.broadcast.emit("userInChatDicrese", { onlineUsers });
    }
    //
    else {
      socket.to(socket.id).emit("failedRemovingUserFromChat");
    }
  });

  socket.on("new-message", ({ sender, receiver, text }) => {
    console.log("newMessage:", sender, receiver, text);
    const socketId = findUser(receiver).socketId;

    if (socketId) {
      socket.to(socketId).emit("message-received", { sender, text });
    }
  });

<<<<<<< HEAD
  socket.on("user-disconnected", () => {
    removeUser(socket.id);
    socket.emit("userDisconnected");
    console.log("socket-disconnected");
  });

  socket.on("disconnectAllUsers", () => {
    removeAllUsers();
    console.log("all User disconnected!");
  });
=======
  socket.on("user-disconnected", async () => {
    await removeUser(socket.id);
    console.log("socket-disconnected");
  });
>>>>>>> 4ac39c985276199be55494fa8abb4c69c0bc7f01
});
