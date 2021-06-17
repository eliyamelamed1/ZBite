import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import NewMessage from './notifications/NewMessage';
import { connect } from 'react-redux';
import { connectSocket } from '../redux/actions/socket';
import { loadLoggedUserDetailsAction } from '../redux/actions/auth';

const layout = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [messageReceived, setMessageReceivied] = useState({
        sender: '',
        text: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectSocket());
    }, [dispatch]);

    const { socket } = useSelector((state) => state.socketReducer);

    useEffect(() => {
        dispatch(loadLoggedUserDetailsAction());
    }, [dispatch]);

    const { loggedUserData } = useSelector((state) => state.authReducer);
    useEffect(() => {
        if (socket && loggedUserData) {
            const id = loggedUserData.id;
            const name = loggedUserData.name;
            console.log(loggedUserData.id);
            socket.emit('user-joined', { id, name });
        }
    }, [socket, loggedUserData]);

    useEffect(() => {
        if (socket) {
            socket.on('message-received', ({ sender, text }) => {
                setShowPopup(true);
                setMessageReceivied({ sender, text }); //while on chat dont show popup
            });
        }
    }, [socket]);

    useEffect(() => {
        if (showPopup && messageReceived) {
            setTimeout(() => {
                setShowPopup(false);
                setMessageReceivied(null);
            }, 3000);
        }
    }, [showPopup, messageReceived]);

    return (
        <div data-testid='layout'>
            <meta name='csrf_token' content='{{ csrf_token }}'></meta>
            <Navbar />
            {showPopup && messageReceived !== null && (
                <>
                    <NewMessage
                        setShowPopup={setShowPopup}
                        setMessageReceivied={setMessageReceivied}
                        sender={messageReceived.sender}
                        text={messageReceived.text}
                    />
                </>
            )}
            {children}
        </div>
    );
};

export default connect()(layout);
