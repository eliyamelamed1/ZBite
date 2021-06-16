import { CHAT_LIST_FAIL, CHAT_LIST_SUCCESS } from '../actions/types';

const initialState = {
    chatsListData: [],
};

export default function chatReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatsListData: payload,
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
