import '@testing-library/jest-dom/extend-expect';

import * as userActions from '../../../redux/actions/userActions';

import {
    followUnFollowAction,
    loadUserDetailsAction,
    loadUserListAction,
    loadloggedUserDataAction,
    loginAction,
    logoutAction,
    resetPasswordAction,
    resetPasswordConfirmAction,
    signupAction,
    userActivateAction,
    userDeleteAction,
    userUpdateAction,
} from '../../../redux/actions/userActions';

import axios from 'axios';
import { cleanup } from 'next-page-tester';
import configureStore from 'redux-mock-store';
import { endpointRoute } from '../../../globals';
import store from '../../../redux/store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('axios request should match url endpoint, and parameters', () => {
    localStorage.setItem('auth_token', 'tokenValue');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    const configWithAuthToken = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
    };

    const parameters = {
        id: 'id',
        email: 'email',
        name: 'name',
        password: 'password',
        re_password: 'password',
        new_password: 'new_password',
        uid: 'uid',
        token: 'token',
    };
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        axios.get.mockReturnValue({ data: true });
        axios.delete.mockReturnValue({ data: true });
        axios.patch.mockReturnValue({ data: true });
        axios.post.mockReturnValue({ data: true });
    });
    test('followUnFollowAction', async () => {
        const store = mockStore({});

        const user_to_follow = 'userToFollow';
        const body = JSON.stringify({ user_to_follow });
        await store.dispatch(followUnFollowAction({ user_to_follow }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.followUnFollow);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
        expect(store.getActions()).toEqual([
            { payload: true, type: 'GET_USER_DETAILS_SUCCESS' },
            { payload: true, type: 'GET_LOGGED_USER_DETAILS_SUCCESS' },
            { type: 'FOLLOW_UNFOLLOW_USER_SUCCESS' },
        ]);
    });
    test('loadloggedUserDataAction', async () => {
        await store.dispatch(loadloggedUserDataAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().users.loggedUserData);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
    });
    test('loadUserListAction', () => {
        store.dispatch(loadUserListAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().users.list);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('loadUserDetailsAction', () => {
        const { id } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}/`;
        store.dispatch(loadUserDetailsAction({ id }));

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('userUpdateAction', () => {
        const { email, name, id } = parameters;
        const body = JSON.stringify({ email, name });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}/`;

        store.dispatch(userUpdateAction({ id, email, name }));

        expect(axios.patch.mock.calls.length).toBe(1);
        expect(axios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.patch.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.patch.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
    });
    test('userDeleteAction', async () => {
        const store = mockStore({});
        const { id } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}/`;

        await store.dispatch(userDeleteAction({ id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
        expect(store.getActions()).toEqual([{ payload: true, type: 'DELETE_USER_SUCCESS' }, { type: 'LOGOUT' }]);
    });

    test('loginAction', async () => {
        const store = mockStore({});
        const { email, password } = parameters;
        const body = JSON.stringify({ email, password });

        await store.dispatch(loginAction({ email, password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.login);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
        expect(store.getActions()).toEqual([
            { payload: true, type: 'LOGIN_SUCCESS' },
            { payload: true, type: 'GET_LOGGED_USER_DETAILS_SUCCESS' },
        ]);
    });
    test('signupAction', () => {
        const { name, email, password, re_password } = parameters;
        const body = JSON.stringify({ name, email, password, re_password });
        store.dispatch(signupAction({ name, email, password, re_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.signup);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('activate', () => {
        const { uid, token } = parameters;
        const body = JSON.stringify({ uid, token });
        store.dispatch(userActivateAction({ uid, token }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.activate);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('resetPasswordAction', () => {
        const { email } = parameters;
        const body = JSON.stringify({ email });

        store.dispatch(resetPasswordAction({ email }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.resetPassword);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });

    test('resetPasswordConfirmAction', () => {
        const { uid, token, new_password } = parameters;
        const body = JSON.stringify({ uid, token, new_password });

        store.dispatch(resetPasswordConfirmAction({ uid, token, new_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.resetPasswordConfirm);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('logoutAction', async () => {
        const store = mockStore({});
        await store.dispatch(logoutAction());

        expect(store.getActions().length).toBe(1);
        expect(store.getActions()).toEqual([{ type: 'LOGOUT' }]);
    });
});
