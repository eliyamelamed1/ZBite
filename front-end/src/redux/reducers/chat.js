import { CHAT_LIST_FAIL, CHAT_LIST_SUCCESS } from '../actions/types';

const initialState = {
    chatsList: [],
};

export default function chatReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatsList: payload,
            };

        case CHAT_LIST_FAIL:
            return {
                ...state,
            };

        default:
            return {
                ...state,
            };
    }
}
