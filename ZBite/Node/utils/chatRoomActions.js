let usersInChat = {};

const addUserToChatRoom = async (userId, socketId, name) => {
  if (usersInChat[name]) {
    if (usersInChat[name].socketId === socketId) {
      return usersInChat;
    }
    //
    else {
      await removeUserFromChatRoom(name);
    }
  }

  const newUser = {
    socketId,
    userId,
  };
  usersInChat[name] = { ...newUser };

  return usersInChat;
};

const removeUserFromChatRoom = async (name) => {
  delete usersInChat[name];
  return usersInChat;
};

// const findUserInChatRoom = (name) => usersInChat[name];

module.exports = {
  addUserToChatRoom,
  removeUserFromChatRoom,
};
