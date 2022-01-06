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
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
} from '../types';

import axiosInstance from '../../components/utils/axiosInstance';
import { endpointRoute } from '../../enums';
import { toast } from 'react-toastify';

export const testAction = () => async (dispatch) => {
    dispatch(secondTestAction());
};
export const secondTestAction = () => {
    console.log('second action have been dispatched');
};

export const followUserAction =
    ({ user_to_follow }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({ user_to_follow });
            await axiosInstance.post(endpointRoute().users.followUser, body);
            toast.success('updated users followed successfully');
            await dispatch(loadUserDetailsAction({ id: user_to_follow }));
            await dispatch(loadLoggedUserDataAction());
            await dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS });
        } catch (err) {
            dispatch({ type: FOLLOW_UNFOLLOW_USER_FAIL });
        }
    };

export const loadUserDetailsAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            const res = await axiosInstance.get(endpointRoute(id).users.details);
            dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: GET_USER_DETAILS_FAIL });
        }
    };

export const userUpdateAction =
    ({ id, email, name }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({
                email,
                name,
            });
            const res = await axiosInstance.patch(endpointRoute(id).users.details, body);
            toast.success('user updated successfully');
            dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: UPDATE_USER_FAIL });
        }
    };

// TODO fix gets an error after deleting user
export const userDeleteAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            const res = await axiosInstance.delete(endpointRoute(id).users.details);
            toast.success('user deleted successfully');
            dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
            dispatch(logoutAction());
        } catch (err) {
            dispatch({ type: DELETE_USER_FAIL });
        }
    };

// load the the details of the connects user loadLoggedUserDataAction
export const loadLoggedUserDataAction = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get(endpointRoute().users.loggedUserData);
        dispatch({ type: GET_LOGGED_USER_DETAILS_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_LOGGED_USER_DETAILS_FAIL });
    }
};

export const loginAction =
    ({ email, password }) =>
    async (dispatch) => {
        const body = JSON.stringify({ email, password });

        try {
            const res = await axiosInstance.post(endpointRoute().users.login, body);
            toast.success('login completed, redirected to home page');
            await dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            await dispatch(loadLoggedUserDataAction());
        } catch (err) {
            dispatch({ type: LOGIN_FAIL });
        }
    };
export const signupAction =
    ({ name, email, password, re_password }) =>
    async (dispatch) => {
        const body = JSON.stringify({
            name,
            email,
            password,
            re_password,
        });

        try {
            const res = await axiosInstance.post(endpointRoute().users.signup, body);
            toast.success('registration completed, redirected to login page');
            dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: SIGNUP_FAIL });
        }
    };

// activate account - activation email is turned off right now (from the api side)
export const userActivateAction =
    ({ uid, token }) =>
    async (dispatch) => {
        const body = JSON.stringify({ uid, token });

        try {
            const res = await axiosInstance.post(endpointRoute().users.activate, body);
            toast.success('user activated successfully');
            dispatch({ type: ACTIVATION_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: ACTIVATION_FAIL });
        }
    };

export const resetPasswordAction =
    ({ email }) =>
    async (dispatch) => {
        const body = JSON.stringify({ email });

        try {
            const res = await axiosInstance.post(endpointRoute().users.resetPassword, body);
            toast.success('email sent successfully');
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: RESET_PASSWORD_FAIL });
        }
    };

export const resetPasswordConfirmAction =
    ({ uid, token, new_password }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({
                uid,
                token,
                new_password,
            });
            const res = await axiosInstance.post(endpointRoute().users.resetPasswordConfirm, body);
            toast.success('password reset completed successfully');
            dispatch({ type: RESET_PASSWORD_CONFIRM_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: RESET_PASSWORD_CONFIRM_FAIL });
        }
    };

export const logoutAction = () => async (dispatch) => {
    toast.success('logout successfully');
    dispatch({ type: LOGOUT });
};

export const loadLeaderboardAction = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get(endpointRoute().users.leaderboard);
        dispatch({ type: LOAD_LEADERBOARD_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: LOAD_LEADERBOARD_FAIL });
    }
};
