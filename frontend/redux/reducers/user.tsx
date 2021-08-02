import {
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    FOLLOW_UNFOLLOW_USER_FAIL,
    FOLLOW_UNFOLLOW_USER_SUCCESS,
    GET_LOGGED_USER_DETAILS_FAIL,
    GET_LOGGED_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_LIST_FAIL,
    GET_USER_LIST_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    TEST_CASE_AUTH,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
} from '../types';

const initialState = {
    auth_token: process.browser ? localStorage.getItem('auth_token') : null,
    isUserAuthenticated: process.browser ? !!localStorage.getItem('auth_token') : null,
    loggedUserData: process.browser ? JSON.parse(localStorage.getItem('loggedUserData')) : null,
    listOfUsers: null,
    requestedUserData: null,
};

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_AUTH:
            return {
                ...state,
                auth_token: payload.auth_token,
                isUserAuthenticated: payload.isUserAuthenticated,
                loggedUserData: payload.loggedUserData,
                listOfUsers: payload.listOfUsers,
                requestedUserData: payload.requestedUserData,
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                requestedUserData: payload,
            };
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                listOfUsers: payload,
            };
        case UPDATE_USER_SUCCESS:
            localStorage.setItem('loggedUserData', JSON.stringify(payload));
            return {
                ...state,
                loggedUserData: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', payload.auth_token);
            return {
                ...state,
                isUserAuthenticated: true,
                auth_token: payload.auth_token,
            };
        case GET_LOGGED_USER_DETAILS_SUCCESS:
            localStorage.setItem('loggedUserData', JSON.stringify(payload));
            return {
                ...state,
                loggedUserData: payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isUserAuthenticated: false,
            };
        case GET_LOGGED_USER_DETAILS_FAIL:
            process.browser ? localStorage.removeItem('loggedUserData') : null;
            return {
                ...state,
                loggedUserData: null,
            };
        case DELETE_USER_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('auth_token');
            localStorage.removeItem('loggedUserData');
            return {
                ...state,
                auth_token: null,
                isUserAuthenticated: false,
                loggedUserData: null,
            };
        case FOLLOW_UNFOLLOW_USER_FAIL:
        case GET_USER_DETAILS_FAIL:
        case GET_USER_LIST_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        case FOLLOW_UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
            };
        case 'TEST_SUCCESS':
            return {
                ...state,
                loggedUserData: payload,
            };

        default:
            return state;
    }
}
