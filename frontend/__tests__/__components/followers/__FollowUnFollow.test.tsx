import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import FollowUnFollow from '../../../components/followers/FollowUnFollow';
import React from 'react';
import { followUnFollowAction } from '../../../redux/actions/follower';
import { useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/follower', () => ({ followUnFollowAction: jest.fn() }));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('FollowUnFollow - logged user is not following the request user', () => {
    const userToFollow = '5';
    const loggedUserData = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: [],
        followers: [],
    };
    useSelector.mockReturnValue(loggedUserData);
    beforeEach(() => {
        render(<FollowUnFollow user_to_follow={userToFollow} />);
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
        const followButton = screen.getByRole('button', { name: /follow/ });
        expect(followButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUnFollowAction ', () => {
        const followButton = screen.getByRole('button', { name: /follow/ });

        userEvent.click(followButton);

        const timesActionHaveDispatched = followUnFollowAction.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowAction.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
    test('follow button should transform to unfollow after following a user ', () => {
        // const followButton = screen.getByRole('button', { name: 'follow' });
        // userEvent.click(followButton);
        // const unFollowButton = screen.findByRole('button', { name: 'unfollow' });
        // expect(followButton).not.toBeInTheDocument();
        // expect(unFollowButton).toBeInTheDocument();
    });
});

describe('FollowUnFollow - logged user is already following the requested user', () => {
    const userToFollow = '5';
    const loggedUserData = {
        id: 'id',
        name: 'name',
        email: 'email',
        following: ['5'],
        followers: [],
    };
    useSelector.mockReturnValue(loggedUserData);
    beforeEach(() => {
        render(<FollowUnFollow user_to_follow={userToFollow} />);
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
        const unFollowButton = screen.getByRole('button', { name: /unfollow/ });
        expect(unFollowButton).toBeInTheDocument();
    });
    test('follow button should dispatch followUnFollowAction ', () => {
        const unFollowButton = screen.getByRole('button', { name: /unfollow/ });

        userEvent.click(unFollowButton);

        const timesActionHaveDispatched = followUnFollowAction.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(followUnFollowAction.mock.calls[0][0].user_to_follow).toBe(userToFollow);
    });
});
