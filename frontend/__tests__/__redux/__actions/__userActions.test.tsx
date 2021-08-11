import '@testing-library/jest-dom/extend-expect';

import {
    followUnFollowAction,
    loadUserDetailsAction,
    loadUserListAction,
    loadloggedUserDataAction,
    loginAction,
    resetPasswordAction,
    resetPasswordConfirmAction,
    signupAction,
    userActivateAction,
    userDeleteAction,
    userUpdateAction,
} from '../../../redux/actions/userActions';

import axios from 'axios';
import store from '../../../redux/store';

// import * as userActions from '../../../redux/actions/userActions';

// const secondTestActionSpy = jest.spyOn(userActions, 'secondTestAction');

// test('should dispatch secondTestActions ', () => {
//     store.dispatch(userActions.testAction());
//     expect(secondTestActionSpy.mock.calls.length).toBe(1);
// });

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

describe('axios request should match url endpoint, and parameters', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('followUnFollowAction', async () => {
        const user_to_follow = 'userToFollow';
        const body = JSON.stringify({ user_to_follow });
        await store.dispatch(followUnFollowAction({ user_to_follow }));
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`;

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
        // TODO test loadUserDetailsAction + loadloggedUserDataAction dispatched
    });
    test('loadUserListAction', () => {
        store.dispatch(loadUserListAction());
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/list/`;

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
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
    test('userDeleteAction', () => {
        // test logoutAction have been dispatched
        // jest.mock('../../../redux/actions/userActions', () => ({ logoutAction: jest.fn() }));
        const { id } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}/`;

        store.dispatch(userDeleteAction({ id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
        // expect(logoutAction.mock.calls.length).toBe('1');
    });
    test('loadloggedUserDataAction', () => {
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/logged_user/`;

        store.dispatch(loadloggedUserDataAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
    });
    test('loginAction', () => {
        const { email, password } = parameters;
        const body = JSON.stringify({ email, password });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/token/login/`;

        store.dispatch(loginAction({ email, password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
        // test should dispatch loadloggedUserDataAction
    });
    test('signupAction', () => {
        const { name, email, password, re_password } = parameters;
        const body = JSON.stringify({ name, email, password, re_password });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/`;

        store.dispatch(signupAction({ name, email, password, re_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('verify', () => {
        const { uid, token } = parameters;
        const body = JSON.stringify({ uid, token });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/activation/`;

        store.dispatch(userActivateAction({ uid, token }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('resetPasswordAction', () => {
        const { email } = parameters;
        const body = JSON.stringify({ email });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password/`;

        store.dispatch(resetPasswordAction({ email }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });

    test('resetPasswordConfirmAction', () => {
        const { uid, token, new_password } = parameters;
        const body = JSON.stringify({ uid, token, new_password });
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/djoser/users/reset_password_confirm/`;

        store.dispatch(resetPasswordConfirmAction({ uid, token, new_password }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    //  TODO fix this test
    // test('logoutAction', async () => {
    //     const store = mockStore(initialState);
    //     jest.mock('../../../redux/actions/userActions', () => ({ logoutAction: jest.fn() }));
    //     store.dispatch(logoutAction());

    //     expect(await logoutAction.mock.calls.length).toBe('');
    // });
});
