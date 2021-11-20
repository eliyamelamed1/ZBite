import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

const updatedState = {
    auth_token: 'updatedState',
    isUserAuthenticated: 'updatedState',
    loggedUserData: 'updatedState',
    requestedUserData: 'updatedState',
};

describe('userReducer - cases that modify the state ', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        initialState = {
            auth_token: null,
            isUserAuthenticated: null,
            loggedUserData: null,
            requestedUserData: null,
        };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        return initialState;
    });

    test('case GET_USER_DETAILS_SUCCESS', () => {
        store.dispatch({ type: 'GET_USER_DETAILS_SUCCESS', payload: updatedState });
        const storeState = store.getState();

        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toStrictEqual(updatedState);
    });

    test('case DELETE_USER_SUCCESS', () => {
        initialState['loggedUserData'] = { email: 'testEmail', name: 'testName', id: 'testId' };
        initialState['auth_token'] = 'testToken';
        initialState['isUserAuthenticated'] = true;
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        store.dispatch({ type: 'DELETE_USER_SUCCESS' });
        initialState = store.getState();

        expect(initialState.userReducer.auth_token).toBeNull();
        expect(initialState.userReducer.isUserAuthenticated).toBe(false);
        expect(initialState.userReducer.loggedUserData).toBeNull();
        expect(initialState.userReducer.requestedUserData).toBeNull();
    });

    test('case UPDATE_USER_SUCCESS ', () => {
        store.dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedState });
        const storeState = store.getState();

        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.loggedUserData).toStrictEqual(updatedState);
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });

    test('case LOGIN_SUCCESS', () => {
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.isUserAuthenticated).toBe(true);
        expect(storeState.userReducer.auth_token).toBe(updatedState.auth_token);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case GET_LOGGED_USER_DETAILS_SUCCESS', () => {
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_SUCCESS', payload: updatedState });
        const storeState = store.getState();

        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.loggedUserData).toStrictEqual(updatedState);
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case SIGNUP_SUCCESS', () => {
        store.dispatch({ type: 'SIGNUP_SUCCESS', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case GET_LOGGED_USER_DETAILS_FAIL', () => {
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case SIGNUP_FAIL', () => {
        store.dispatch({ type: 'SIGNUP_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case LOGIN_FAIL', () => {
        store.dispatch({ type: 'LOGIN_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
    test('case LOGOUT', () => {
        store.dispatch({ type: 'LOGOUT', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
    });
});

describe('userReducer - cases that return ...state', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        initialState = {
            auth_token: null,
            isUserAuthenticated: null,
            loggedUserData: null,
            requestedUserData: null,
        };
        store.dispatch({ type: 'TEST_CASE_AUTH', payload: initialState });
        return initialState;
    });
    afterEach(() => {
        const storeState = store.getState();
        expect(storeState.userReducer).toEqual(initialState);
    });

    test('case GET_USER_DETAILS_FAIL', () => {
        store.dispatch({ type: 'GET_USER_DETAILS_FAIL', payload: updatedState });
    });
    test('case UPDATE_USER_FAIL ', () => {
        store.dispatch({ type: 'UPDATE_USER_FAIL', payload: updatedState });
    });
    test('case DELETE_USER_FAIL', () => {
        store.dispatch({ type: 'DELETE_USER_FAIL', payload: updatedState });
    });
    test('case FOLLOW_UNFOLLOW_USER_SUCCESS', () => {
        store.dispatch({ type: 'FOLLOW_UNFOLLOW_USER_SUCCESS', payload: updatedState });
    });
    test('case FOLLOW_UNFOLLOW_USER_FAIL', () => {
        store.dispatch({ type: 'FOLLOW_UNFOLLOW_USER_FAIL', payload: updatedState });
    });
    test('case default', () => {
        store.dispatch({ type: 'default', payload: updatedState });
    });
});
