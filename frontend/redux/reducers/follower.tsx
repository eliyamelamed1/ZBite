import { FOLLOW_UNFOLLOW_USER_FAIL, FOLLOW_UNFOLLOW_USER_SUCCESS } from '../types';

const initialState = {
    status: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FOLLOW_UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                status: payload,
            };
        case FOLLOW_UNFOLLOW_USER_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
