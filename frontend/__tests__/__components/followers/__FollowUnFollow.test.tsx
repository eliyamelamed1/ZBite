import '@testing-library/jest-dom/extend-expect';

import { Provider, useSelector } from 'react-redux';
import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import FollowUnFollow from '../../../components/followers/FollowUnFollow';
import React from 'react';
import configureStore from 'redux-mock-store';
import { followUnFollowAction } from '../../../redux/actions/follower';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/follower', () => ({
    followUnFollowAction: jest.fn(),
}));

const userToFollow = '5';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FollowUnFollow - isUserAlreadyFollowed false', () => {
    beforeEach(() => {
        const loggedUserData = {
            id: 'id',
            name: 'name',
            email: 'email',
            following: [],
            followers: [],
        };
        const initialState = {
            userReducer: { isUserAuthenticated: true, loggedUserData: loggedUserData },
        };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <FollowUnFollow user_to_follow={userToFollow} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing ', () => {});
    test('should match own data-testid ', () => {
        const followUnFollow = screen.getByTestId('followUnFollow');
        expect(followUnFollow).toBeInTheDocument();
    });
    test('should render follow button', () => {
        const followButton = screen.getByRole('button', { name: 'follow' });
        expect(followButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUnFollowAction ', () => {
        const followButton = screen.getByRole('button', { name: 'follow' });

        userEvent.click(followButton);
        const timesActionHaveDispatched = followUnFollowAction.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowAction.mock.calls[0][0].user_to_follow).toBe(userToFollow);

        // const unFollowButton = screen.getByRole('button', { name: 'unfollow' });
        // expect(unFollowButton).toBeInTheDocument();
    });
});

describe('FollowUnFollow - isUserAlreadyFollowed true', () => {
    beforeEach(() => {
        const loggedUserData = {
            id: 'id',
            name: 'name',
            email: 'email',
            following: [userToFollow],
            followers: [],
        };
        const initialState = { userReducer: { isUserAuthenticated: true, loggedUserData: loggedUserData } };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <FollowUnFollow user_to_follow={userToFollow} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing ', () => {});
    test('should match own data-testid ', () => {
        const followUnFollow = screen.getByTestId('followUnFollow');
        expect(followUnFollow).toBeInTheDocument();
    });
    test('should render follow button', () => {
        const unFollowButton = screen.getByRole('button', { name: 'unfollow' });
        expect(unFollowButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUnFollowAction ', () => {
        const unFollowButton = screen.getByRole('button', { name: 'unfollow' });

        userEvent.click(unFollowButton);

        const timesActionHaveDispatched = followUnFollowAction.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowAction.mock.calls[0][0].user_to_follow).toBe(userToFollow);
        // const followButton = screen.getByRole('button', { name: 'unfollow' });
        // expect(followButton).toBeInTheDocument();
    });
});
