import { CONNECT_SOCKET } from './types';
import io from 'socket.io-client';

export const connectSocket = () => {
    const baseUrl = 'http://localhost:8080';
    const socket = io(baseUrl);
    return {
        type: CONNECT_SOCKET,
        payload: { socket },
    };
};
