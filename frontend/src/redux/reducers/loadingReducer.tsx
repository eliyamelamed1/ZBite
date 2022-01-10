import { SET_LOADING } from '../types';

const initialState = {
    isLoading: false,
};

export default function loadingReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: payload };
        default:
            return state;
    }
}
