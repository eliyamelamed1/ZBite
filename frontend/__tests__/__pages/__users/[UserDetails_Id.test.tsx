import '@testing-library/jest-dom/extend-expect';

import * as reactRedux from 'react-redux';
import * as userActions from '../../../redux/actions/userActions';

import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ssrContextParams, userParams } from '../../../globals';

import { Provider } from 'react-redux';
import React from 'react';
import { TEST_CASE_AUTH } from '../../../redux/types';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import axios from 'axios';
import { getServerSideProps } from '../../../pages/users/[UserDetails_Id]';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const loadUserDetailsActionSpy = jest.spyOn(userActions, 'loadUserDetailsAction');
jest.mock('axios');

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
    const outdatedUserData = {
        ...userParams.loggedUser,
    };
    const updatedUserData = {
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
        axios.patch.mockReturnValueOnce({ data: updatedUserData });
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
        const userEmail = screen.getByText(userParams.loggedUser.email);
        const userName = screen.getByText(userParams.loggedUser.name);

        expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
    });
    test('should render myProfileLinks', () => {
        const myProfileLinks = screen.getByTestId('myProfileLinks');

        expect(myProfileLinks).toBeInTheDocument();
    });
    test('should render UserUpdate component', () => {
        const userUpdateTestId = screen.getByTestId('userUpdate');

        expect(userUpdateTestId).toBeInTheDocument();
    });
    test('should render UserDelete component', () => {
        const userDeleteTestId = screen.getByTestId('userDelete');

        expect(userDeleteTestId).toBeInTheDocument();
    });
    test('should not render follow/unfollow component', () => {
        const followUnFollow = screen.queryByTestId('followUnFollow');

        expect(followUnFollow).not.toBeInTheDocument();
    });

    test('migrateLoggedUserData  - should display updated user data', async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const nameInput = screen.getByPlaceholderText(/name/i);
        const updateButton = screen.getByRole('button', { name: /update/i });
        const emailValue = updatedUserData.email;
        const nameValue = updatedUserData.name;
        userEvent.type(emailInput, emailValue);
        userEvent.type(nameInput, nameValue);

        const outdatedEmail = await screen.findByText(outdatedUserData.email);
        const outdatedName = await screen.findByText(outdatedUserData.name);
        waitForElementToBeRemoved(outdatedEmail && outdatedName);

        userEvent.click(updateButton);
        const updatedEmail = await screen.findByText(updatedUserData.email);
        const updatedName = await screen.findByText(updatedUserData.name);
        expect(updatedEmail).toBeInTheDocument();
        expect(updatedName).toBeInTheDocument();
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
    test('should render the user details ', () => {
        const userEmail = screen.getByText(userParams.otherUser.email);
        const userName = screen.getByText(userParams.otherUser.name);

        expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
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
        const followUnFollow = screen.getByTestId('followUnFollow');

        expect(followUnFollow).toBeInTheDocument();
    });
    test('should render follow/unfollow button', () => {
        const followButton = screen.getByRole('button');
        userEvent.click(followButton);

        expect(followButton).toBeInTheDocument();
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

        const updatedFollowingCount = await screen.findByText(/following: 1/i);
        const updatedUserEmail = await screen.findByText(updatedUserData.name);
        const updatedUserName = await screen.findByText(updatedUserData.email);

        expect(updatedFollowingCount).toBeInTheDocument();
        expect(updatedUserEmail).toBeInTheDocument();
        expect(updatedUserName).toBeInTheDocument();
    });
    test('migrateRequestedUserData => isUserDataMatchReqId === false => should not update userData', async () => {
        const initialState = {
            requestedUserData: userParams.otherUser2,
            loggedUserData: userParams.loggedUser,
            isUserAuthenticated: true,
        };
        await store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });

        const serverSideUserEmail = await screen.findByText(userParams.otherUser.email);
        expect(serverSideUserEmail).toBeInTheDocument();

        const updatedUserEmail = screen.queryByText(userParams.otherUser2.email);
        expect(updatedUserEmail).not.toBeInTheDocument();
    });
});
