import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import NewMessage from '../components/notifications/NewMessage';
import { connect } from 'react-redux';
import { connectSocket } from '../actions/socket';
import { loadLoggedUserDetailsAction } from '../actions/auth';

const layout = ({ loadLoggedUserDetailsAction, children }) => {
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
        loadLoggedUserDetailsAction();
    }, []);

    const { loggedUser } = useSelector((state) => state.authReducer);
    useEffect(() => {
        if (socket && loggedUser) {
            const id = loggedUser.id;
            const name = loggedUser.name;
            console.log(loggedUser.id);
            socket.emit('user-joined', { id, name });
        }
    }, [socket, loggedUser]);

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

export default connect(null, { loadLoggedUserDetailsAction })(layout);
