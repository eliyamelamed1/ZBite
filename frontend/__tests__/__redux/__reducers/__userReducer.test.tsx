import '@testing-library/jest-dom/extend-expect';

import Router from 'next/router';
import { cleanup } from '@testing-library/react';
import { pageRoute } from '../../../globals';
import store from '../../../redux/store';

jest.mock('next/router', () => ({
    push: jest.fn(),
}));
const updatedState = {
    auth_token: 'updatedState',
    isUserAuthenticated: 'updatedState',
    loggedUserData: 'updatedState',
    requestedUserData: 'updatedState',
    listOfLeaderboardUsers: 'updatedState',
};

describe('userReducer - cases that modify the state ', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        initialState = {
            auth_token: null,
            isUserAuthenticated: null,
            loggedUserData: null,
            requestedUserData: null,
            listOfLeaderboardUsers: null,
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
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
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
        expect(initialState.userReducer.listOfLeaderboardUsers).toBeNull();

        expect(initialState.userReducer.requestedUserData).toBeNull();
    });

    test('case UPDATE_USER_SUCCESS ', () => {
        store.dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedState });
        const storeState = store.getState();

        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.loggedUserData).toStrictEqual(updatedState);
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });

    test('case LOGIN_SUCCESS', () => {
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.isUserAuthenticated).toBe(true);
        expect(storeState.userReducer.auth_token).toBe(updatedState.auth_token);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });
    test('case GET_LOGGED_USER_DETAILS_SUCCESS', () => {
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_SUCCESS', payload: updatedState });
        const storeState = store.getState();

        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.loggedUserData).toStrictEqual(updatedState);
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });
    test('case SIGNUP_SUCCESS', () => {
        store.dispatch({ type: 'SIGNUP_SUCCESS', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe(pageRoute().login);
    });
    test('case GET_LOGGED_USER_DETAILS_FAIL', () => {
        store.dispatch({ type: 'GET_LOGGED_USER_DETAILS_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });
    test('case SIGNUP_FAIL', () => {
        store.dispatch({ type: 'SIGNUP_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
        expect(Router.push.mock.calls.length).toBe(0);
    });
    test('case LOGIN_FAIL', () => {
        store.dispatch({ type: 'LOGIN_FAIL', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });
    test('case LOGOUT', () => {
        store.dispatch({ type: 'LOGOUT', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBe(false);
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBeNull();
    });
    test('case LOAD_LEADERBOARD_SUCCESS', () => {
        store.dispatch({ type: 'LOAD_LEADERBOARD_SUCCESS', payload: updatedState });
        const storeState = store.getState();
        expect(storeState.userReducer.auth_token).toBeNull();
        expect(storeState.userReducer.isUserAuthenticated).toBeNull();
        expect(storeState.userReducer.loggedUserData).toBeNull();
        expect(storeState.userReducer.requestedUserData).toBeNull();
        expect(storeState.userReducer.listOfLeaderboardUsers).toBe(updatedState);
    });
});

describe('userReducer - cases that return ...state', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        initialState = {};
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
    test('case LOAD_LEADERBOARD_FAIL', () => {
        store.dispatch({ type: 'LOAD_LEADERBOARD_FAIL', payload: updatedState });
    });
    test('case default', () => {
        store.dispatch({ type: 'default', payload: updatedState });
    });
});
