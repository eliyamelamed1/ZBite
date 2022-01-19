import '@testing-library/jest-dom/extend-expect';

import * as FollowUser from '../../../components/followers/FollowUser';
import * as userActions from '../../../redux/actions/userActions';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/constants';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import axios from 'axios';
import { getServerSideProps } from '../../../pages/users/[UserDetails_Id]';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';
import { userParams } from '../../../enums';

const loadUserDetailsActionSpy = jest.spyOn(userActions, 'loadUserDetailsAction');
const FollowUserSpy = jest.spyOn(FollowUser, 'default');

jest.mock('axios');

const ssrContextParams = {
    loggedUser: {
        params: { UserDetails_Id: userParams.loggedUser.id },
    },
    otherUser: {
        params: { UserDetails_Id: userParams.otherUser.id },
    },
    nonExistingUser: {
        params: { UserDetails_Id: userParams.nonExistingUser?.id },
    },
};

describe('UserDetails - getServerSideProps', () => {
    beforeEach(() => {
        axios.get.mockReturnValueOnce({ data: userParams.loggedUser });
    });
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should dispatch loadUserDetailsAction', async () => {
        await getServerSideProps(ssrContextParams.loggedUser);
        const timesActionDispatched = loadUserDetailsActionSpy.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsActionSpy.mock.calls[0][0].id).toBe(userParams.loggedUser.id);
    });
    test('should return matching props', async () => {
        const props = (await getServerSideProps(ssrContextParams.loggedUser)).props;
        expect(props.serverUserData).toEqual(userParams.loggedUser);
    });
    test('if recipe doesnt exist return not found', async () => {
        const notFound = (await getServerSideProps(ssrContextParams.nonExistingUser)).notFound;
        expect(notFound).toEqual(true);
    });
});

describe('UserDetails - loggedUser visit his own profile', () => {
    const serverSideUserData = {
        ...userParams.loggedUser,
    };
    let updatedUserData = {
        ...userParams.loggedUser,
        email: 'updatedEmail',
        name: 'updatedName',
    };
    beforeEach(async () => {
        cleanup();
        jest.clearAllMocks();

        const initialState = {
            loggedUserData: userParams.loggedUser,
            requestedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        const serverUserData = userParams.loggedUser;
        render(
            <Provider store={store}>
                <UserDetails_Id serverUserData={serverUserData} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const userDetailsTestId = screen.getByTestId('userDetails');
        expect(userDetailsTestId).toBeInTheDocument();
    });
    test('should render the user details ', () => {
        const optionsDotsButton = screen.getByTestId('optionsDots');
        userEvent.click(optionsDotsButton);

        const updateUserButton = screen.getByText('update user');
        userEvent.click(updateUserButton);

        // const userEmail = screen.getByText(userParams.loggedUser.email);
        const userName = screen.getByText(userParams.loggedUser.name);

        // expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
    });
    test('should render myProfileLinks', () => {
        const optionsDotsButton = screen.getByTestId('optionsDots');
        userEvent.click(optionsDotsButton);

        const myProfileLinks = screen.getByTestId('myProfileLinks');

        expect(myProfileLinks).toBeInTheDocument();
    });
    test('should render UserUpdate component', () => {
        const optionsDotsButton = screen.getByTestId('optionsDots');
        userEvent.click(optionsDotsButton);

        const userUpdateTestId = screen.getByTestId('userUpdate');

        expect(userUpdateTestId).toBeInTheDocument();
    });
    test('should render UserDelete component', () => {
        const optionsDotsButton = screen.getByTestId('optionsDots');
        userEvent.click(optionsDotsButton);

        const userDeleteTestId = screen.getByTestId('userDelete');

        expect(userDeleteTestId).toBeInTheDocument();
    });
    test('should not render follow/unfollow component', () => {
        const followUser = screen.queryByTestId('followUser');

        expect(followUser).not.toBeInTheDocument();
    });
    test('migrateLoggedUserData => isUserDataMatchReqId === true => should update user data', async () => {
        const initialState = {
            loggedUserData: updatedUserData,
            requestedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        await store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        // const updatedEmail = await screen.findByText(updatedUserData.email);
        const updatedName = await screen.findByText(updatedUserData.name);
        // const serverSideEmail = screen.queryByText(serverSideUserData.email);
        const serverSideName = screen.queryByText(serverSideUserData.name);

        // expect(updatedEmail).toBeInTheDocument();
        expect(updatedName).toBeInTheDocument();
        // expect(serverSideEmail).not.toBeInTheDocument();
        expect(serverSideName).not.toBeInTheDocument();
    });
    test('migrateLoggedUserData => isUserDataMatchReqId === false => should not update user data', async () => {
        updatedUserData = {
            ...updatedUserData,
            id: 'someRandomUserId',
            email: 'someRandomUserEmail',
            name: 'someRandomUserName',
        };
        const initialState = {
            loggedUserData: updatedUserData,
            requestedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        // const serverSideEmail = screen.getByText(serverSideUserData.email);
        const serverSideName = screen.getByText(serverSideUserData.name);
        // const updatedEmail = screen.queryByText(updatedUserData.email);
        const updatedName = screen.queryByText(updatedUserData.name);

        // expect(serverSideEmail).toBeInTheDocument();
        expect(serverSideName).toBeInTheDocument();
        // expect(updatedEmail).not.toBeInTheDocument();
        expect(updatedName).not.toBeInTheDocument();
    });
});

describe('UserDetails - loggedUser visiting other account profile', () => {
    beforeEach(async () => {
        cleanup();
        jest.clearAllMocks();
        const initialState = {
            loggedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <UserDetails_Id serverUserData={userParams.otherUser} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const userDetailsTestId = screen.getByTestId('userDetails');
        expect(userDetailsTestId).toBeInTheDocument();
    });

    test('should not render myProfileLinks', () => {
        const myProfileLinks = screen.queryByTestId('myProfileLinks');
        expect(myProfileLinks).not.toBeInTheDocument();
    });
    test('should not render UserUpdate component', () => {
        const userUpdateTestId = screen.queryByTestId('userUpdate');

        expect(userUpdateTestId).not.toBeInTheDocument();
    });
    test('should not render UserDelete component', () => {
        const userDeleteTestId = screen.queryByTestId('userDelete');

        expect(userDeleteTestId).not.toBeInTheDocument();
    });
    test('should render follow/unfollow component', () => {
        expect(FollowUserSpy).toHaveBeenCalled();
    });
    test('should render the user details ', () => {
        // const userEmail = screen.getByText(userParams.otherUser.email);
        const userName = screen.getByText(userParams.otherUser.name);

        // expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
    });
    test('migrateRequestedUserData => isUserDataMatchReqId === true => should update userData', async () => {
        const updatedUserData = {
            ...userParams.otherUser,
            email: 'updatedEmail@gmail.com',
            name: 'updatedName',
            following: ['otherUser'],
        };
        const initialState = {
            requestedUserData: updatedUserData,
            loggedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        const updatedFollowingCount = await screen.findByTestId('following count');
        const updatedUserName = await screen.findByText(updatedUserData.name);
        // const updatedUserEmail = await screen.findByText(updatedUserData.email);

        expect(updatedFollowingCount).toBeInTheDocument();
        expect(updatedUserName).toBeInTheDocument();
        // expect(updatedUserEmail).toBeInTheDocument();
    });
    test('migrateRequestedUserData => isUserDataMatchReqId === false => should not update userData', async () => {
        const initialState = {
            requestedUserData: userParams.otherUser2,
            loggedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        await store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        const serverSideUserName = await screen.findByText(userParams.otherUser.name);
        expect(serverSideUserName).toBeInTheDocument();

        const updatedUserName = screen.queryByText(userParams.otherUser2.name);
        expect(updatedUserName).not.toBeInTheDocument();
    });
});
