import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import FollowUnFollow from '../../../components/followers/FollowUnFollow';
import React from 'react';
import { followUnFollowAction } from '../../../redux/actions/follower';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/follower', () => ({ followUnFollowAction: jest.fn() }));
const loggedUserData = {
    id: 'id',
    name: 'name',
    email: 'email',
    following: [],
    followers: [],
};
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockReturnValue(loggedUserData),
}));

const user_followed = '5';

beforeEach(() => {
    render(<FollowUnFollow user_followed={user_followed} />);
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('FollowUnFollow ', () => {
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
        expect(followUnFollowAction.mock.calls[0][0].user_followed).toBe(user_followed);
    });
    test('follow button should transform to unfollow button when the used is already followed', () => {});
});
