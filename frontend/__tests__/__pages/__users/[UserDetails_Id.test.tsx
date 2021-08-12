import '@testing-library/jest-dom/extend-expect';

import * as reactRedux from 'react-redux';

import { cleanup, render, screen } from '@testing-library/react';
import { ssrContextParams, userParams } from '../../../globals';

import { Provider } from 'react-redux';
import React from 'react';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import { getServerSideProps } from '../../../pages/users/[UserDetails_Id]';
import { loadUserDetailsAction } from '../../../redux/actions/userActions';
import store from '../../../redux/store';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

jest.mock('../../../redux/actions/userActions', () => ({ loadUserDetailsAction: jest.fn() }));
jest.mock('../../../redux/store.tsx');

describe('UserDetails - getServerSideProps', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    store.getState = () => ({
        userReducer: {
            requestedUserData: userParams.loggedUser,
        },
    });
    test('should dispatch loadUserDetailsAction', async () => {
        await getServerSideProps(ssrContextParams.loggedUser);
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(userParams.loggedUser.id);
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

describe('UserDetails - my profile', () => {
    beforeEach(async () => {
        useSelectorMock.mockReturnValue({
            loggedUserData: userParams.loggedUser,
            requestedUserData: userParams.loggedUser,
        });
        store.getState = () => ({
            userReducer: {
                requestedUserData: userParams.loggedUser,
            },
        });
        const { serverUserData } = (await getServerSideProps(ssrContextParams.loggedUser)).props;
        render(
            <Provider store={store}>
                <UserDetails_Id serverUserData={serverUserData} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
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
});

describe('UserDetails - other account profile', () => {
    beforeEach(async () => {
        useSelectorMock.mockReturnValue({
            loggedUserData: userParams.loggedUser,
            requestedUserData: userParams.otherUser,
        });
        store.getState = () => ({
            userReducer: {
                requestedUserData: userParams.otherUser,
            },
        });
        const { serverUserData } = (await getServerSideProps(ssrContextParams.otherUser)).props;

        render(
            <Provider store={store}>
                <UserDetails_Id serverUserData={serverUserData} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const userDetailsTestId = screen.getByTestId('userDetails');
        expect(userDetailsTestId).toBeInTheDocument();
    });
    test('should dispatch loadUserDetailsAction', () => {
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(userParams.otherUser.id);
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
    test('hould not render UserUpdate component', () => {
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
});
