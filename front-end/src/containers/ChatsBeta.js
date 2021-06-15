import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageForm from '../components/notifications/MessageForm';
import { loadUserListAction } from '../redux/actions/auth';

function Chat() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [currentChatWith, setCurrentChatWith] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState({});

    const { userList, loggedUser } = useSelector((state) => state.authReducer);
    const { socket } = useSelector((state) => state.socketReducer);

    useEffect(() => {
        dispatch(loadUserListAction());
    }, [dispatch]);

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
        if (location.search && userList) {
            const userId = location.search.split('=')[1];
            setCurrentChatWith(userList.find((user) => user.id === userId));
        }
    }, [location.search, userList, loggedUser]);

    return (
        <div>
            {userList && loggedUser ? (
                userList.map((user) => {
                    if (user.name !== loggedUser.name) {
                        return (
                            <li style={{ display: 'flex' }} key={user.id}>
                                <Link to={`/chats/?chat=${user.id}`}>{user.name}</Link>
                                {Object.prototype.hasOwnProperty.call(onlineUsers, user.name) && <h3>ONLINE</h3>}
                            </li>
                        );
                    }
                })
            ) : (
                <>loading</>
            )}
            {currentChatWith && loggedUser && (
                <div>
                    <h1>{currentChatWith.name}</h1>
                    <MessageForm sender={loggedUser.name} receiver={currentChatWith.name} />
                </div>
            )}
        </div>
    );
}

export default Chat;
