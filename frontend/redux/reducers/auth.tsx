import {
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
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
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
} from '../actions/types';

const TEST_CASE_AUTH = 'TEST_CASE_AUTH';

const initialState = {
    auth_token: process.browser ? localStorage.getItem('auth_token') : null,
    isUserAuthenticated: process.browser ? !!localStorage.getItem('auth_token') : null,
    loggedUserDetails: process.browser ? JSON.parse(localStorage.getItem('loggedUserDetails')) : null,
    listOfUsers: null,
    searchedUserDetails: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_AUTH:
            return {
                ...state,
                auth_token: payload.auth_token,
                isUserAuthenticated: payload.isUserAuthenticated,
                loggedUserDetails: payload.loggedUserDetails,
                listOfUsers: payload.listOfUsers,
                searchedUserDetails: payload.searchedUserDetails,
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                searchedUserDetails: payload,
            };
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                listOfUsers: payload,
            };
        case UPDATE_USER_SUCCESS:
            localStorage.setItem('loggedUserDetails', JSON.stringify(payload));
            return {
                ...state,
                loggedUserDetails: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', payload.auth_token);
            return {
                ...state,
                isUserAuthenticated: true,
                auth_token: payload.auth_token,
            };
        case GET_LOGGED_USER_DETAILS_SUCCESS:
            localStorage.setItem('loggedUserDetails', JSON.stringify(payload));
            return {
                ...state,

                loggedUserDetails: payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isUserAuthenticated: false,
            };
        case GET_LOGGED_USER_DETAILS_FAIL:
            process.browser ? localStorage.removeItem('loggedUserDetails') : null;
            return {
                ...state,
                loggedUserDetails: null,
            };
        case DELETE_USER_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('auth_token');
            localStorage.removeItem('loggedUserDetails');
            return {
                ...state,
                auth_token: null,
                isUserAuthenticated: false,
                loggedUserDetails: null,
            };
        case GET_USER_DETAILS_FAIL:
        case GET_USER_LIST_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
}
