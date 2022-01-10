import '@testing-library/jest-dom/extend-expect';

import * as userActions from '../../../redux/actions/userActions';

import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import FollowUser from '../../../components/followers/FollowUser';
import { Provider } from 'react-redux';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/types';
import axios from 'axios';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const followUserActionSpy = jest.spyOn(userActions, 'followUserAction');

const userToFollow = 'userToFollow';

describe('FollowUser - isUserAlreadyFollowed false', () => {
    const data = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [userToFollow],
        followers: [],
    };
    const loggedUserData = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [],
        followers: [],
    };
    const initialState = {
        isUserAuthenticated: true,
        loggedUserData: loggedUserData,
    };
    beforeEach(() => {
        axios.get.mockReturnValueOnce({ data });
        axios.post.mockReturnValueOnce(() => {});
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <FollowUser userToFollow={userToFollow} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing ', () => {});
    test('should match own data-testid ', () => {
        const followUser = screen.getByTestId('followUser');
        expect(followUser).toBeInTheDocument();
    });
    test('should render follow button', () => {
        const followButton = screen.getByRole('button', { name: 'follow' });
        expect(followButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUserAction ', async () => {
        const followButton = screen.getByRole('button', { name: 'follow' });

        userEvent.click(followButton);
        const timesActionHaveDispatched = followUserActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUserActionSpy.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('clicking the "follow" button should change the text to: "unfollow" ', async () => {
        const followButton = await screen.findByRole('button', { name: 'follow' });
        userEvent.click(followButton);

        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        expect(unFollowButton).toBeInTheDocument();
    });
});

describe('FollowUser - isUserAlreadyFollowed true', () => {
    const data = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [],
        followers: [],
    };
    const loggedUserData = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [userToFollow],
        followers: [],
    };
    const initialState = {
        isUserAuthenticated: true,
        loggedUserData: loggedUserData,
    };

    beforeEach(() => {
        axios.get.mockReturnValueOnce({ data });
        axios.post.mockReturnValueOnce(() => {});
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <FollowUser userToFollow={userToFollow} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing ', () => {});
    test('should match own data-testid ', () => {
        const followUser = screen.getByTestId('followUser');
        expect(followUser).toBeInTheDocument();
    });
    test('should render follow button', async () => {
        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        expect(unFollowButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUserAction ', async () => {
        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });

        userEvent.click(unFollowButton);

        const timesActionHaveDispatched = followUserActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUserActionSpy.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('clicking the "unfollow" button should change the text to: "follow" ', async () => {
        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        userEvent.click(unFollowButton);

        const followButton = await screen.findByRole('button', { name: 'follow' });
        expect(followButton).toBeInTheDocument();
    });
});
