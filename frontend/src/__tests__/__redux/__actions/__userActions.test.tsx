import '@testing-library/jest-dom/extend-expect';

import { BASE_URL, endpointRoute } from '../../../enums';
import {
    followUserAction,
    loadLoggedUserDataAction,
    loadUserDetailsAction,
    loginAction,
    logoutAction,
    resetPasswordAction,
    resetPasswordConfirmAction,
    signupAction,
    userActivateAction,
    userDeleteAction,
    userUpdateAction,
} from '../../../redux/actions/userActions';

import configureStore from 'redux-mock-store';
import mockAxios from '../../../__mocks__/axios';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('axios request should match url endpoint, and parameters', () => {
    describe('success case', () => {
        localStorage.setItem('auth_token', 'tokenValue');

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
        const store = mockStore({});
        beforeEach(() => {
            jest.clearAllMocks();
            store.clearActions();
            mockAxios.get.mockReturnValue({ data: true });
            mockAxios.delete.mockReturnValue({ data: true });
            mockAxios.patch.mockReturnValue({ data: true });
            mockAxios.post.mockReturnValue({ data: true });
        });
        test('followUserAction', async () => {
            const user_to_follow = 'userToFollow';
            const body = JSON.stringify({ user_to_follow });
            await store.dispatch(followUserAction({ user_to_follow }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.followUser);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
            expect(store.getActions()).toEqual([
                { payload: true, type: 'GET_USER_DETAILS_SUCCESS' },
                { payload: true, type: 'GET_LOGGED_USER_DETAILS_SUCCESS' },
                { type: 'FOLLOW_UNFOLLOW_USER_SUCCESS' },
            ]);
        });
        test('loadLoggedUserDataAction', async () => {
            await store.dispatch(loadLoggedUserDataAction());

            expect(mockAxios.get.mock.calls.length).toBe(1);
            expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().users.loggedUserData);
        });
        test('loadUserDetailsAction', () => {
            const { id } = parameters;
            const endpointUrl = `${BASE_URL}/api/accounts/${id}/`;
            store.dispatch(loadUserDetailsAction({ id }));
            expect(mockAxios.get.mock.calls.length).toBe(1);
            expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        });
        test('userUpdateAction', () => {
            const { email, name, id } = parameters;
            const body = JSON.stringify({ email, name });
            const endpointUrl = `${BASE_URL}/api/accounts/${id}/`;

            store.dispatch(userUpdateAction({ id, email, name }));

            expect(mockAxios.patch.mock.calls.length).toBe(1);
            expect(mockAxios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);

            const formData = mockAxios.patch.mock.calls[0][1];
            expect(formData.get('name')).toStrictEqual(name);
            expect(formData.get('email')).toStrictEqual(email);
        });
        test('userDeleteAction', async () => {
            const { id } = parameters;
            const endpointUrl = `${BASE_URL}/api/accounts/${id}/`;

            await store.dispatch(userDeleteAction({ id }));

            expect(mockAxios.delete.mock.calls.length).toBe(1);
            expect(mockAxios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
            expect(store.getActions()).toEqual([
                { payload: true, type: 'DELETE_USER_SUCCESS' },
                { type: 'LOGOUT_SUCCESS' },
            ]);
        });
        test('loginAction', async () => {
            const { email, password } = parameters;
            const body = JSON.stringify({ email, password });

            await store.dispatch(loginAction({ email, password }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.login);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
            expect(store.getActions()).toEqual([
                { payload: true, type: 'LOGIN_SUCCESS' },
                { payload: true, type: 'GET_LOGGED_USER_DETAILS_SUCCESS' },
            ]);
        });
        test('signupAction', () => {
            const { name, email, password, re_password } = parameters;
            const body = JSON.stringify({ name, email, password, re_password });
            store.dispatch(signupAction({ name, email, password, re_password }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.signup);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
        });
        test('activate', () => {
            const { uid, token } = parameters;
            const body = JSON.stringify({ uid, token });
            store.dispatch(userActivateAction({ uid, token }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.activate);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
        });
        test('resetPasswordAction', () => {
            const { email } = parameters;
            const body = JSON.stringify({ email });

            store.dispatch(resetPasswordAction({ email }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.resetPassword);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
        });
        test('resetPasswordConfirmAction', () => {
            const { uid, token, new_password } = parameters;
            const body = JSON.stringify({ uid, token, new_password });

            store.dispatch(resetPasswordConfirmAction({ uid, token, new_password }));

            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.resetPasswordConfirm);
            expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
        });
        test('logout Action', async () => {
            await store.dispatch(logoutAction());

            expect(store.getActions().length).toBe(1);
            expect(store.getActions()).toEqual([{ type: 'LOGOUT_SUCCESS' }]);
            expect(mockAxios.post.mock.calls.length).toBe(1);
            expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().users.logout);
        });
    });
});
