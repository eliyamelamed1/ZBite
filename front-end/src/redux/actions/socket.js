import { CONNECT_SOCKET } from './types';
import io from 'socket.io-client';

export const connectSocket = () => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    return {
        type: CONNECT_SOCKET,
        payload: { socket },
    };
};
