import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../store';

describe('reducers - auth ', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            auth_token: 'initialValue',
            isAuthenticated: 'initialValue',
            loggedUser: 'initialValue',
            userList: 'initialValue',
            userDetails: 'initialValue',
        };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        return initialState;
    });
    test('case LOAD_USER_DETAILS_FAIL', () => {
        initialState['userDetails'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'LOAD_USER_DETAILS_FAIL', payload: initialState.userDetails });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case LOAD_USER_DETAILS_SUCCESS', () => {
        initialState['userDetails'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'LOAD_USER_DETAILS_SUCCESS', payload: initialState.userDetails });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
    });
    test('case LOAD_USER_LIST_FAIL', () => {
        initialState['userList'] = { firstUser: { name: 'testName' }, secondeUser: { name: 'testName2' } };
        store.dispatch({ type: 'LOAD_USER_LIST_FAIL', payload: initialState.userList });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case LOAD_USER_LIST_SUCCESS', () => {
        initialState['userList'] = { firstUser: { name: 'testName' }, secondeUser: { name: 'testName2' } };
        store.dispatch({ type: 'LOAD_USER_LIST_SUCCESS', payload: initialState.userList });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toStrictEqual({
            firstUser: { name: 'testName' },
            secondeUser: { name: 'testName2' },
        });
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case USER_DELETED_FAIL', () => {
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        initialState['auth_token'] = 'testToken';
        initialState['isAuthenticated'] = true;
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        store.dispatch({ type: 'USER_DELETED_fail' });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe(true);
        expect(initialState.authReducer.auth_token).toBe('testToken');
        expect(initialState.authReducer.loggedUser).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case USER_DELETED_SUCCESS', () => {
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        initialState['auth_token'] = 'testToken';
        initialState['isAuthenticated'] = true;
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        store.dispatch({ type: 'USER_DELETED_SUCCESS' });
        initialState = store.getState();

        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticated).toBe(false);
        expect(initialState.authReducer.loggedUser).toBe(null);
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });

    test('case USER_UPDATED_FAIL ', () => {
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        initialState['loggedUser'] = { email: 'testEmail2', name: 'testName2' };
        store.dispatch({ type: 'USER_UPDATED_FAIL', payload: initialState });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case USER_UPDATED_SUCCESS ', () => {
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        initialState['loggedUser'] = { email: 'testEmail2', name: 'testName2' };
        store.dispatch({ type: 'USER_UPDATED_SUCCESS', payload: initialState.loggedUser });
        initialState = store.getState();

        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toStrictEqual({
            email: 'testEmail2',
            name: 'testName2',
        });
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });

    test('case LOGIN_SUCCESS', () => {
        initialState['auth_token'] = 'testToken';
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.authReducer.isAuthenticated).toBe(true);
        expect(initialState.authReducer.auth_token).toBe('testToken');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case USER_LOADED_SUCCESS', () => {
        initialState['loggedUser'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        store.dispatch({ type: 'USER_LOADED_SUCCESS', payload: initialState.loggedUser });
        initialState = store.getState();

        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toStrictEqual({
            email: 'testEmail',
            name: 'testName',
            id: 'testId',
        });
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case SIGNUP_SUCCESS', () => {
        store.dispatch({ type: 'SIGNUP_SUCCESS' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticated).toBe(false);
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case USER_LOADED_FAIL', () => {
        store.dispatch({ type: 'USER_LOADED_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe(null);
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case SIGNUP_FAIL', () => {
        store.dispatch({ type: 'SIGNUP_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticated).toBe(false);
        expect(initialState.authReducer.loggedUser).toBe(null);
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case LOGIN_FAIL', () => {
        store.dispatch({ type: 'LOGIN_FAIL' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticated).toBe(false);
        expect(initialState.authReducer.loggedUser).toBe(null);
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case LOGOUT', () => {
        store.dispatch({ type: 'LOGOUT' });
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe(null);
        expect(initialState.authReducer.isAuthenticated).toBe(false);
        expect(initialState.authReducer.loggedUser).toBe(null);
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
    test('case default', () => {
        initialState = store.getState();
        expect(initialState.authReducer.auth_token).toBe('initialValue');
        expect(initialState.authReducer.isAuthenticated).toBe('initialValue');
        expect(initialState.authReducer.loggedUser).toBe('initialValue');
        expect(initialState.authReducer.userList).toBe('initialValue');
        expect(initialState.authReducer.userDetails).toBe('initialValue');
    });
});
