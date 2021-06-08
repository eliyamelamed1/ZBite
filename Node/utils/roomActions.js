let users = {};

const addUser = (userId, socketId, name) => {
    if (users[name]) {
        if (users[name].socketId === socketId && users[name].userId === userId) {
            return users;
        }
        //
        else {
            removeUser(name);
        }
    }

    const newUser = {
        socketId,
        userId,
        inChat: false,
    };
    users[name] = { ...newUser };

    return users;
};

const removeUser = (name) => {
    delete users[name];
    return;
};

const findUser = (name) => {
    return users[name];
};

const addUserToChatRoom = (userId, socketId, name) => {
    if (users[name] && users[name].userId === userId && users[name].socketId === socketId) {
        users[name].inChat = true;
    } else {
        return { error: 'Adding user to chat failed' };
    }
};

const removeUserFromChatRoom = (name) => {
    if (users[name] && users[name].inChat) {
        users[name].inChat = false;
    } else {
        return { error: 'Removing user to chat failed' };
    }
};

const findOnlineUsers = () => {
    let onlineUsers = {};
    for (let user in users) {
        if (users[user].inChat) {
            onlineUsers[user] = users[user];
        }
    }
    return onlineUsers;
};

const removeAllUsers = () => {
    //for testing functonallity
    users = {};
    return;
};

const getAllUsers = () => users;

module.exports = {
    addUser,
    removeUser,
    findUser,
    addUserToChatRoom,
    removeUserFromChatRoom,
    findOnlineUsers,
    removeAllUsers,
    getAllUsers,
};

/*
users = {
  myUserName:{
    userId:1,
    socketId:123,
    inChat:true
  }
}
*/
