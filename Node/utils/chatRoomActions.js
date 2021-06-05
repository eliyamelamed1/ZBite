let usersInChat = {};

const addUserToChatGroup = async (userId, socketId, name) => {
    if (usersInChat[name]) {
        if (usersInChat[name].socketId === socketId) {
            return usersInChat;
        }
        //
        else {
            await removeUserFromChatGroup(name);
        }
    }

    const newUser = {
        socketId,
        userId,
    };
    usersInChat[name] = { ...newUser };

    return usersInChat;
};

const removeUserFromChatGroup = async (name) => {
    delete usersInChat[name];
    return usersInChat;
};

// const findUserInChatGroup = (name) => usersInChat[name];

module.exports = {
    addUserToChatGroup,
    removeUserFromChatGroup,
};
