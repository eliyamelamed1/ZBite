import { CHAT_LIST_FAIL, CHAT_LIST_SUCCESS } from './types';

import axios from 'axios';

export const getChatsListAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat_duos/list/`, config);
        dispatch({ type: CHAT_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: CHAT_LIST_FAIL });
    }
};

export const startDuoChatAction = async (id, chatsList) => {
    try {
        console.log('44444444444444', chatsList);
        const isChatExist = chatsList.find((chat) => chat.members.includes(id));

        console.log(isChatExist);

        if (!isChatExist) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat_duos/create/`, { id }, config);
            return `chats/chat/${res.data.id}`;
        } else {
            return `chats/chat/${isChatExist.id}`;
        }
    } catch (err) {
        console.log(err);
    }
};
