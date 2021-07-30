import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import configureStore from 'redux-mock-store';
import { getServerSideProps } from '../../../pages/users/[UserDetails_Id]';
import { loadUserDetailsAction } from '../../../redux/actions/auth';
import thunk from 'redux-thunk';

const userParams = {
    firstUserId: 'firstUserId',
    secondUserId: 'secondUserId',
    nonExistingId: 'nonExistingId',
    email: 'testEmail',
    name: 'testName',
};
const userData = {
    id: userParams.firstUserId,
    email: userParams.email,
    name: userParams.name,
};
const contextParams = {
    existingUser: {
        params: { UserDetails_Id: userParams.firstUserId },
    },
    nonExistingUser: {
        params: { UserDetails_Id: userParams.nonExistingId },
    },
};
jest.mock('../../../redux/actions/auth', () => ({ loadUserDetailsAction: jest.fn() }));
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        authReducer: {
            searchedUserData: { id: userParams.firstUserId, email: userParams.email, name: userParams.name },
        },
    })),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('UserDetails - getServerSideProps', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should dispatch loadUserDetailsAction', async () => {
        await getServerSideProps(contextParams.existingUser);
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(userParams.firstUserId);
    });
    test('should return matching props', async () => {
        const props = (await getServerSideProps(contextParams.existingUser)).props;
        expect(props.userData).toEqual(userData);
    });
    test('if recipe doesnt exist return not found', async () => {
        const notFound = (await getServerSideProps(contextParams.nonExistingUser)).notFound;
        expect(notFound).toEqual(true);
    });
});

describe('UserDetails - my profile', () => {
    let initialState = {
        authReducer: {
            loggedUserData: { id: userParams.firstUserId, email: userParams.email, name: userParams.name },
        },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { userData } = (await getServerSideProps(contextParams.existingUser)).props;
        render(
            <Provider store={store}>
                <UserDetails_Id userData={userData} />
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
        const userEmail = screen.getByText(/testEmail/i);
        const userName = screen.getByText(/testName/i);

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
    let initialState = {
        authReducer: {
            searchedUserData: { id: userParams.secondUserId, email: userParams.email, name: userParams.name },
        },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { userData } = (await getServerSideProps(contextParams.existingUser)).props;

        render(
            <Provider store={store}>
                <UserDetails_Id userData={userData} />
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
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(userParams.firstUserId);
    });
    test('should render the user details ', () => {
        const userEmail = screen.getByText(/testEmail/i);
        const userName = screen.getByText(/testName/i);

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
