import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatList from '../../components/chats/ChatsList';
import ChooseUserToChatWith from '../../components/chats/ChooseUserToChatWith';
import { getChatsListAction } from '../../redux/actions/chat';
import { loadUserListAction } from '../../redux/actions/auth';

function Chats() {
    const dispatch = useDispatch();

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        dispatch(getChatsListAction());
        dispatch(loadUserListAction());
    }, []);

    const { socket } = useSelector((state) => state.socketReducer);
    const { chatsList } = useSelector((state) => state.chatReducer);
    const { userList, loggedUser } = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (socket && loggedUser) {
            socket.emit('userConnectedToChat', {
                username: loggedUser.name,
                id: loggedUser.id,
            });

            socket.on('currentUsers', ({ onlineUsers }) => {
                setOnlineUsers(onlineUsers);
            });

            socket.on('userInChatIncrese', ({ onlineUsers }) => {
                setOnlineUsers(onlineUsers);
            });

            socket.on('userInChatDicrese', ({ onlineUsers }) => {
                setOnlineUsers(onlineUsers);
            });
        }
        return () => {
            if (socket && loggedUser) {
                socket.emit('userDisconectedFromChat', {
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
            {userList && loggedUser && chatsList && (
                <ChooseUserToChatWith userList={userList} loggedUser={loggedUser} chatsList={chatsList} />
            )}
            {onlineUsers && <ChatList chats={chats} onlineUsers={onlineUsers} />}
        </>
    );
}
export default Chats;
