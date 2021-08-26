// TODO - ADD TESTS FOR GUEST USER

import '@testing-library/jest-dom/extend-expect';

import * as userActions from '../../../redux/actions/userActions';

import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import FollowUnFollow from '../../../components/followers/FollowUnFollow';
import { Provider } from 'react-redux';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/types';
import axios from 'axios';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const followUnFollowActionSpy = jest.spyOn(userActions, 'followUnFollowAction');
jest.mock('axios');

const userToFollow = 'userToFollow';

describe('FollowUnFollow - isUserAlreadyFollowed false', () => {
    const data = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [userToFollow],
        followers: [],
    };

    beforeEach(() => {
        axios.get.mockReturnValueOnce({ data });
        axios.post.mockReturnValueOnce(() => {});
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
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <FollowUnFollow userToFollow={userToFollow} />
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
    test('follow button should dispatch followUnFollowAction ', async () => {
        const followButton = screen.getByRole('button', { name: 'follow' });

        userEvent.click(followButton);
        const timesActionHaveDispatched = followUnFollowActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowActionSpy.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('clicking the "follow" button should change the text to: "unfollow" ', async () => {
        let followButton = await screen.findByRole('button', { name: 'follow' });
        waitForElementToBeRemoved(followButton);
        userEvent.click(followButton);

        let unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        expect(unFollowButton).toBeInTheDocument();
    });
});

describe('FollowUnFollow - isUserAlreadyFollowed true', () => {
    const data = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [],
        followers: [],
    };

    beforeEach(() => {
        axios.get.mockReturnValueOnce({ data });
        axios.post.mockReturnValueOnce(() => {});
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
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <FollowUnFollow userToFollow={userToFollow} />
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
    test('should render follow button', async () => {
        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        expect(unFollowButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUnFollowAction ', async () => {
        const unFollowButton = await screen.findByRole('button', { name: 'unfollow' });

        userEvent.click(unFollowButton);

        const timesActionHaveDispatched = followUnFollowActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowActionSpy.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('clicking the "unfollow" button should change the text to: "follow" ', async () => {
        let unFollowButton = await screen.findByRole('button', { name: 'unfollow' });
        waitForElementToBeRemoved(unFollowButton);
        userEvent.click(unFollowButton);

        let followButton = await screen.findByRole('button', { name: 'follow' });
        expect(followButton).toBeInTheDocument();
    });
});
