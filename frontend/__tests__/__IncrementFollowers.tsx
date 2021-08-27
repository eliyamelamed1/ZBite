import '@testing-library/jest-dom/extend-expect';

import * as reactRedux from 'react-redux';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ssrContextParams, userParams } from '../globals';

import { TEST_CASE_AUTH } from '../redux/types';
import UserDetails_Id from '../pages/users/[UserDetails_Id]';
import axios from 'axios';
import { getServerSideProps } from '../pages/users/[UserDetails_Id]';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const userWithOneFollowing = {
    ...userParams.otherUser,
    following: ['otherUser'],
};

const userWithZeroFollowing = {
    ...userParams.otherUser,
    following: [],
};

axios.post.mockReturnValue(() => {});

const initialState = {
    isUserAuthenticated: true,
    loggedUserData: userParams.loggedUser,
};
store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

test('should increment following count by 1, after successfully following', async () => {
    axios.get.mockReturnValue({ data: userWithZeroFollowing });
    const { serverUserData } = (await getServerSideProps(ssrContextParams.otherUser)).props;
    axios.get.mockReturnValue({ data: userWithOneFollowing });

    render(
        <reactRedux.Provider store={store}>
            <UserDetails_Id serverUserData={serverUserData} />
        </reactRedux.Provider>
    );
    const followButton = screen.getByRole('button');

    const initialFollowingCount = await screen.findByText(/following: 0/i);
    waitForElementToBeRemoved(initialFollowingCount);

    userEvent.click(followButton);

    const updatedFollowingCount = await screen.findByText(/following: 1/i);
    expect(updatedFollowingCount).toBeInTheDocument();
});

test('should decrement following count by 1, after successfully unfollowing', async () => {
    axios.get.mockReturnValue({ data: userWithOneFollowing });
    const { serverUserData } = (await getServerSideProps(ssrContextParams.otherUser)).props;
    axios.get.mockReturnValue({ data: userWithZeroFollowing });

    render(
        <reactRedux.Provider store={store}>
            <UserDetails_Id serverUserData={serverUserData} />
        </reactRedux.Provider>
    );
    const followButton = screen.getByRole('button');

    const initialFollowingCount = await screen.findByText(/following: 1/i);
    waitForElementToBeRemoved(initialFollowingCount);
    userEvent.click(followButton);

    const updatedFollowingCount = await screen.findByText(/following: 0/i);
    expect(updatedFollowingCount).toBeInTheDocument();
});
