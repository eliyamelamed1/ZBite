import '@testing-library/jest-dom/extend-expect';

import * as follower from '../../../redux/actions/follower';

import { Provider, useSelector } from 'react-redux';
import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import FollowUnFollow from '../../../components/followers/FollowUnFollow';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/types';
import axios from 'axios';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';
import userReducer from '../../../redux/reducers/user';

const followUnFollowAction = jest.spyOn(follower, 'followUnFollowAction');
jest.mock('axios');

const userToFollow = '5';

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
        axios.post.mockReturnValueOnce({ data });
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
        const timesActionHaveDispatched = followUnFollowAction.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowAction.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('clicking the "follow" button should change the text to: "unfollow" ', async () => {
        let followButton = screen.getByRole('button', { name: 'follow' });
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
        axios.post.mockReturnValueOnce({ data });
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
    });
    test('clicking the "unfollow" button should change the text to: "follow" ', async () => {
        let unFollowButton = screen.getByRole('button', { name: 'unfollow' });
        userEvent.click(unFollowButton);

        let followButton = await screen.findByRole('button', { name: 'follow' });
        expect(followButton).toBeInTheDocument();
    });
});
