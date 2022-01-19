import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    FOLLOW_UNFOLLOW_USER_FAIL,
    FOLLOW_UNFOLLOW_USER_SUCCESS,
    GET_LOGGED_USER_DETAILS_FAIL,
    GET_LOGGED_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,
    GET_USER_DETAILS_SUCCESS,
    LOAD_LEADERBOARD_FAIL,
    LOAD_LEADERBOARD_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    TEST_CASE_AUTH,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
} from '../constants';

import Router from 'next/router';
import axiosInstance from '../../utils/axiosInstance';
import { pageRoute } from '../../enums';

const initialState = {
    auth_token: process.browser ? localStorage.getItem('auth_token') : null,
    isUserAuthenticated: process.browser ? !!localStorage.getItem('auth_token') : null,
    loggedUserData: process.browser ? JSON.parse(localStorage.getItem('loggedUserData')) : null,
    requestedUserData: null,
    listOfLeaderboardUsers: null,
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
                requestedUserData: payload.requestedUserData,
                listOfLeaderboardUsers: payload.listOfLeaderboardUsers,
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                requestedUserData: payload,
            };
        case UPDATE_USER_SUCCESS:
            localStorage.setItem('loggedUserData', JSON.stringify(payload));
            return {
                ...state,
                loggedUserData: payload,
            };
        case LOGIN_SUCCESS:
            Router.push(pageRoute().home);
            localStorage.setItem('auth_token', payload.auth_token);
            axiosInstance.defaults.headers.common.Authorization = `Token ${payload.auth_token}`;
            return {
                ...state,
                isUserAuthenticated: true,
                auth_token: payload.auth_token,
            };
        case GET_LOGGED_USER_DETAILS_SUCCESS:
            const apiRoute = process.env.NEXT_PUBLIC_API_URL;
            if (payload?.photo_main?.includes(apiRoute) === false)
                payload.photo_main = `${apiRoute}${payload.photo_main}`;
            localStorage.setItem('loggedUserData', JSON.stringify(payload));
            return {
                ...state,
                loggedUserData: payload,
            };
        case SIGNUP_SUCCESS:
            Router.push(pageRoute().login);
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
        case LOAD_LEADERBOARD_SUCCESS:
            return {
                ...state,
                listOfLeaderboardUsers: payload,
            };
        case DELETE_USER_SUCCESS:
            Router.push(pageRoute().home);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('loggedUserData');
            return {
                ...state,
                auth_token: null,
                isUserAuthenticated: false,
                loggedUserData: null,
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('loggedUserData');
            localStorage.removeItem('auth_token');
            axiosInstance.defaults.headers.common.Authorization = null;
            return {
                ...state,
                auth_token: null,
                isUserAuthenticated: false,
                loggedUserData: null,
            };
        case RESET_PASSWORD_SUCCESS:
            Router.push(pageRoute().home);
            return {
                ...state,
            };
        case RESET_PASSWORD_CONFIRM_SUCCESS:
            Router.push(pageRoute().home);
            return {
                ...state,
            };
        case ACTIVATION_SUCCESS:
            Router.push(pageRoute().home);
            return {
                ...state,
            };
        case ACTIVATION_FAIL:
        case RESET_PASSWORD_CONFIRM_FAIL:
        case RESET_PASSWORD_FAIL:
        case FOLLOW_UNFOLLOW_USER_FAIL:
        case GET_USER_DETAILS_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        case FOLLOW_UNFOLLOW_USER_SUCCESS:
        case LOAD_LEADERBOARD_FAIL:
        case LOGOUT_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
