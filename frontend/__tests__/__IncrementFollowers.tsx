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

const data = {
    id: 'otherUserId',
    name: 'otherUser34',
    email: 'otherUser4',
    following: ['otherUser'],
    followers: [],
};

const defaultUser = {
    id: 'otherUserId',
    name: 'otherUser',
    email: 'otherUser',
    following: [],
    followers: [],
};

axios.post.mockReturnValue(() => {});

const initialState = {
    isUserAuthenticated: true,
    loggedUserData: userParams.loggedUser,
};
store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

test('should increment following count by 1, after successfully following', async () => {
    axios.get.mockReturnValue({ data: defaultUser });
    const { serverUserData } = (await getServerSideProps(ssrContextParams.otherUser)).props;
    axios.get.mockReturnValue({ data });

    render(
        <reactRedux.Provider store={store}>
            <UserDetails_Id serverUserData={serverUserData} />
        </reactRedux.Provider>
    );

    const followButton = screen.getByRole('button');
    userEvent.click(followButton);

    // waitForElementToBeRemoved(await screen.findByText(/following: 02/i));
    const updatedFollowingCount = await screen.findByText(/following: 1/i);
    expect(updatedFollowingCount).toBeInTheDocument();
});
