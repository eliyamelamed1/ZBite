import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    LOAD_USER_DETAILS_FAIL,
    LOAD_USER_DETAILS_SUCCESS,
    LOAD_USER_LIST_FAIL,
    LOAD_USER_LIST_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    USER_DELETED_FAIL,
    USER_DELETED_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    USER_UPDATED_FAIL,
    USER_UPDATED_SUCCESS,
} from './types';

import axios from 'axios';

export const loadUserDetailsAction = (id) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/`, config);
        dispatch({ type: LOAD_USER_DETAILS_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: LOAD_USER_DETAILS_FAIL });
    }
};

export const loadUserListAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/list/`, config);
        dispatch({ type: LOAD_USER_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: LOAD_USER_LIST_FAIL });
    }
};

export const userUpdateAction =
    ({ id, email, name }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
            },
        };
        const body = JSON.stringify({
            email,
            name,
        });
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/`, body, config);
            dispatch({ type: USER_UPDATED_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: USER_UPDATED_FAIL });
        }
    };

// TODO fix gets an error after deleting user
export const userDeleteAction = (id) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            Accept: 'application/json',
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/`, config);
        dispatch({ type: USER_DELETED_SUCCESS, payload: res.data });
        dispatch(logoutAction());
    } catch {
        dispatch({ type: USER_DELETED_FAIL });
    }
};

// load the the details of the connects user loadLoggedUserDetailsAction
export const loadLoggedUserDetailsAction = () => async (dispatch) => {
    if (localStorage.getItem('auth_token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/djoser/users/me/`, config);

            dispatch({ type: USER_LOADED_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: USER_LOADED_FAIL });
        }
    } else {
        dispatch({ type: USER_LOADED_FAIL });
    }
};

export const loginAction =
    ({ email, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/djoser/token/login/`, body, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            dispatch(loadLoggedUserDetailsAction());
        } catch (err) {
            dispatch({ type: LOGIN_FAIL });
        }
    };
export const signupAction =
    ({ name, email, password, re_password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({
            name,
            email,
            password,
            re_password,
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/djoser/users/`, body, config);

            dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: SIGNUP_FAIL });
        }
    };

// activate account - activation email is turned off right now (from the api side)
export const verify = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/djoser/users/activation/`, body, config);

        dispatch({ type: ACTIVATION_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: ACTIVATION_FAIL });
    }
};

export const resetPasswordAction = (email) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/djoser/users/reset_password/`, body, config);

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_FAIL });
    }
};

export const resetPasswordConfirmAction = (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password,
    });

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/djoser/users/reset_password_confirm/`,
            body,
            config
        );
        dispatch({ type: RESET_PASSWORD_CONFIRM_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_CONFIRM_FAIL });
    }
};

export const logoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
};
