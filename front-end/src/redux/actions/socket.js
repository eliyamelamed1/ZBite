import { CONNECT_SOCKET } from './types';
import { baseUrl } from '../../utils/baseUrl';
import io from 'socket.io-client';

export const connectSocket = () => {
    const socket = io(baseUrl);
    return {
        type: CONNECT_SOCKET,
        payload: { socket },
    };
};
