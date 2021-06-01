let users = {};

const addUser = async (userId, socketId, name) => {
  if (users[name]) {
    if (users[name].socketId === socketId) {
      return users;
    }
    //
    else {
      await removeUser(name);
    }
  }

  const newUser = {
    socketId,
    userId,
  };
  users[name] = { ...newUser };

  return users;
};

const removeUser = async (name) => {
  delete users[name];
  return;
};

const findUser = (name) => {
  console.log("users:", users);
  return users[name];
};

module.exports = { addUser, removeUser, findUser };
