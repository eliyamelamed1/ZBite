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
    auth_token: localStorage.getItem('auth_token'),
    isAuthenticatedData: !!localStorage.getItem('auth_token'),
    loggedUserData: null,
    userListData: null,
    userDetailsData: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_AUTH:
            return {
                ...state,
                auth_token: payload.auth_token,
                isAuthenticatedData: payload.isAuthenticatedData,
                loggedUserData: payload.loggedUserData,
                userListData: payload.userListData,
                userDetailsData: payload.userDetailsData,
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetailsData: payload,
            };
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                userListData: payload,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loggedUserData: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', payload.auth_token);
            return {
                ...state,
                isAuthenticatedData: true,
                auth_token: payload.auth_token,
            };
        case GET_LOGGED_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loggedUserData: payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticatedData: false,
            };
        case GET_LOGGED_USER_DETAILS_FAIL:
            return {
                ...state,
                loggedUserData: null,
            };
        case DELETE_USER_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('auth_token');
            return {
                ...state,
                auth_token: null,
                isAuthenticatedData: false,
                loggedUserData: null,
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
