import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

describe('reducers - auth ', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            auth_token: 'initialValue',
            isAuthenticatedData: 'initialValue',
            loggedUserData: 'initialValue',
            userListData: 'initialValue',
            userDetailsData: 'initialValue',
        };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        return initialState;
    });
    test('case GET_USER_DETAILS_FAIL', () => {
        initialState['userDetailsData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'GET_USER_DETAILS_FAIL', payload: initialState.userDetailsData });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case GET_USER_DETAILS_SUCCESS', () => {
        initialState['userDetailsData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'GET_USER_DETAILS_SUCCESS', payload: initialState.userDetailsData });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
    });
    test('case GET_USER_LIST_FAIL', () => {
        initialState['userListData'] = { firstUser: { name: 'testName' }, secondeUser: { name: 'testName2' } };
        store.dispatch({ type: 'GET_USER_LIST_FAIL', payload: initialState.userListData });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case GET_USER_LIST_SUCCESS', () => {
        initialState['userListData'] = { firstUser: { name: 'testName' }, secondeUser: { name: 'testName2' } };
        store.dispatch({ type: 'GET_USER_LIST_SUCCESS', payload: initialState.userListData });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toStrictEqual({
            firstUser: { name: 'testName' },
            secondeUser: { name: 'testName2' },
        });
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case DELETE_USER_FAIL', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        initialState['auth_token'] = 'testToken';
        initialState['isAuthenticatedData'] = true;
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        store.dispatch({ type: 'DELETE_USER_FAIL' });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe(true);
        expect(initialState.authReducer.auth_token).toBe('testToken');
        expect(initialState.authReducer.loggedUserData).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case DELETE_USER_SUCCESS', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        initialState['auth_token'] = 'testToken';
        initialState['isAuthenticatedData'] = true;
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        store.dispatch({ type: 'DELETE_USER_SUCCESS' });
        initialState = store.getState();

        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticatedData).toBe(false);
        expect(initialState.authReducer.loggedUserData).toBe(null);
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });

    test('case UPDATE_USER_FAIL ', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        initialState['loggedUserData'] = { email: 'testEmail2', name: 'testName2' };
        store.dispatch({ type: 'UPDATE_USER_FAIL', payload: initialState });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case UPDATE_USER_SUCCESS ', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        initialState['loggedUserData'] = { email: 'testEmail2', name: 'testName2' };
        store.dispatch({ type: 'UPDATE_USER_SUCCESS', payload: initialState.loggedUserData });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toStrictEqual({
            email: 'testEmail2',
            name: 'testName2',
        });
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });

    test('case LOGIN_SUCCESS', () => {
        initialState['auth_token'] = 'testToken';
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.authReducer.isAuthenticatedData).toBe(true);
        expect(initialState.authReducer.auth_token).toBe('testToken');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case GET_LOGGED_USER_DETAILS_SUCCESS', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_SUCCESS', payload: initialState.loggedUserData });
        initialState = store.getState();

        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case SIGNUP_SUCCESS', () => {
        store.dispatch({ type: 'SIGNUP_SUCCESS' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticatedData).toBe(false);
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case GET_LOGGED_USER_DETAILS_FAIL', () => {
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe(null);
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case SIGNUP_FAIL', () => {
        store.dispatch({ type: 'SIGNUP_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticatedData).toBe(false);
        expect(initialState.authReducer.loggedUserData).toBe(null);
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case LOGIN_FAIL', () => {
        store.dispatch({ type: 'LOGIN_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticatedData).toBe(false);
        expect(initialState.authReducer.loggedUserData).toBe(null);
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case LOGOUT', () => {
        store.dispatch({ type: 'LOGOUT' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticatedData).toBe(false);
        expect(initialState.authReducer.loggedUserData).toBe(null);
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
    test('case default', () => {
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticatedData).toBe('initialValue');
        expect(initialState.authReducer.loggedUserData).toBe('initialValue');
        expect(initialState.authReducer.userListData).toBe('initialValue');
        expect(initialState.authReducer.userDetailsData).toBe('initialValue');
    });
});
