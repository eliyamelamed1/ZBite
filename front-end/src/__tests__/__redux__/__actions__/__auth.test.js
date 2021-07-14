import '@testing-library/jest-dom/extend-expect';

import {
    loadLoggedUserDetailsAction,
    loadUserDetailsAction,
    loadUserListAction,
    loginAction,
    resetPasswordAction,
    resetPasswordConfirmAction,
    signupAction,
    userDeleteAction,
    userUpdateAction,
    verify,
} from '../../../redux/actions/auth';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {};
const store = mockStore(initialState);

localStorage.setItem('auth_token', 'tokenValue');
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const config2 = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
};
const config3 = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
        Accept: 'application/json',
    },
};

const id = 'id';
const email = 'email';
const name = 'name';
const password = 'password';
const re_password = 'password';
const new_password = 'new_password';
const uid = 'uid';
const token = 'token';

describe('axios request should match url endpoint, and parameters', () => {
    test('loadUserListAction', () => {
        store.dispatch(loadUserListAction());
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/accounts/list/`;

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('loadUserDetailsAction', () => {
        store.dispatch(loadUserDetailsAction({ id }));
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/accounts/${id}/`;

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('userUpdateAction', () => {
        const body = JSON.stringify({ email, name });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/accounts/${id}/`;

        store.dispatch(userUpdateAction({ id, email, name }));

        expect(axios.patch.mock.calls.length).toBe(1);
        expect(axios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.patch.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.patch.mock.calls[0][2]).toStrictEqual(config2);
    });
    test('userDeleteAction', () => {
        // test logoutAction have been dispatched
        // jest.mock('../../../redux/actions/auth', () => ({ logoutAction: jest.fn() }));
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/accounts/${id}/`;

        store.dispatch(userDeleteAction({ id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(config3);
        // expect(logoutAction.mock.calls.length).toBe('1');
    });
    test('loadLoggedUserDetailsAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/users/me/`;

        store.dispatch(loadLoggedUserDetailsAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config3);
    });
    test('loginAction', () => {
        const body = JSON.stringify({ email, password });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/token/login/`;

        store.dispatch(loginAction({ email, password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
        // test should dispatch loadLoggedUserDetailsAction
    });
    test('signupAction', () => {
        const body = JSON.stringify({ name, email, password, re_password });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/users/`;

        store.dispatch(signupAction({ name, email, password, re_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('verify', () => {
        const body = JSON.stringify({ uid, token });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/users/activation/`;

        store.dispatch(verify({ uid, token }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('resetPasswordAction', () => {
        const body = JSON.stringify({ email });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/users/reset_password/`;

        store.dispatch(resetPasswordAction({ email }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });

    test('resetPasswordConfirmAction', () => {
        const body = JSON.stringify({ uid, token, new_password });
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/djoser/users/reset_password_confirm/`;

        store.dispatch(resetPasswordConfirmAction({ uid, token, new_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    //  TODO fix this test
    // test('logoutAction', async () => {
    //     const store = mockStore(initialState);
    //     jest.mock('../../../redux/actions/auth', () => ({ logoutAction: jest.fn() }));
    //     store.dispatch(logoutAction());

    //     expect(await logoutAction.mock.calls.length).toBe('');
    // });
});
