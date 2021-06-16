import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatList from './ChatsList';
import ChooseUserToChatWith from './ChooseUserToChatWith';
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
    const { chatsListData } = useSelector((state) => state.chatReducer);
    const { userListData, loggedUserData } = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (socket && loggedUserData) {
            socket.emit('userConnectedToChat', {
                username: loggedUserData.name,
                id: loggedUserData.id,
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
            if (socket && loggedUserData) {
                socket.emit('userDisconectedFromChat', {
                    username: loggedUserData.name,
                    id: loggedUserData.id,
                });
                socket.off();
            }
        };
    }, [socket, loggedUserData]);

    useEffect(() => {
        if (chatsListData && userListData) {
            const updatedChats = chatsListData.map((chat) => {
                return userListData.find(
                    (user) =>
                        (user.id === chat.members[0] && user.id !== loggedUserData.id) ||
                        (user.id === chat.members[1] && user.id !== loggedUserData.id)
                );
            });
            setChats(updatedChats);
        }
    }, [chatsListData, userListData]);

    return (
        <>
            {userListData && loggedUserData && chatsListData && (
                <ChooseUserToChatWith
                    userListData={userListData}
                    loggedUserData={loggedUserData}
                    chatsListData={chatsListData}
                />
            )}
            {onlineUsers && <ChatList chats={chats} onlineUsers={onlineUsers} />}
        </>
    );
}
export default Chats;
