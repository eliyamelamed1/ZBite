import {
    LOAD_USER_DETAILS_FAIL,
    LOAD_USER_DETAILS_SUCCESS,
    LOAD_USER_LIST_FAIL,
    LOAD_USER_LIST_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    USER_DELETED_FAIL,
    USER_DELETED_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    USER_UPDATED_FAIL,
    USER_UPDATED_SUCCESS,
} from '../actions/types';

const TEST_CASE_AUTH = 'TEST_CASE_AUTH';

const initialState = {
    auth_token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
    loggedUser: null,
    userList: null,
    userDetails: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_AUTH:
            return {
                ...state,
                auth_token: payload.auth_token,
                isAuthenticated: payload.isAuthenticated,
                loggedUser: payload.loggedUser,
                userList: payload.userList,
                userDetails: payload.userDetails,
            };
        case LOAD_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: payload,
            };
        case LOAD_USER_LIST_SUCCESS:
            return {
                ...state,
                userList: payload,
            };
        case USER_UPDATED_SUCCESS:
            return {
                ...state,
                loggedUser: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', payload.auth_token);
            return {
                ...state,
                isAuthenticated: true,
                auth_token: payload.auth_token,
            };
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                loggedUser: payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                loggedUser: null,
            };
        case USER_DELETED_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('auth_token');
            return {
                ...state,
                auth_token: null,
                isAuthenticated: false,
                loggedUser: null,
            };
        case LOAD_USER_DETAILS_FAIL:
        case LOAD_USER_LIST_FAIL:
        case USER_UPDATED_FAIL:
        case USER_DELETED_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
}
