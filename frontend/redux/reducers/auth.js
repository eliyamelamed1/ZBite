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
        case LOAD_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetailsData: payload,
            };
        case LOAD_USER_LIST_SUCCESS:
            return {
                ...state,
                userListData: payload,
            };
        case USER_UPDATED_SUCCESS:
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
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                loggedUserData: payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticatedData: false,
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                loggedUserData: null,
            };
        case USER_DELETED_SUCCESS:
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
