import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import configureStore from 'redux-mock-store';
import { getServerSideProps } from '../../../pages/users/[UserDetails_Id]';
import { loadUserDetailsAction } from '../../../redux/actions/userActions';
import thunk from 'redux-thunk';

const firstUser = {
    id: 'firstUserId',
    email: 'firstEmail',
    name: 'firstName',
};

const nonExistingUser = {
    id: 'id',
};

const contextParams = {
    firstExistingUser: {
        params: { UserDetails_Id: firstUser.id },
    },
    nonExistingUser: {
        params: { UserDetails_Id: nonExistingUser.id },
    },
};
jest.mock('../../../redux/actions/userActions', () => ({ loadUserDetailsAction: jest.fn() }));
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        userReducer: {
            requestedUserData: { id: firstUser.id, email: firstUser.email, name: firstUser.name },
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
        await getServerSideProps(contextParams.firstExistingUser);
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(firstUser.id);
    });
    test('should return matching props', async () => {
        const props = (await getServerSideProps(contextParams.firstExistingUser)).props;
        expect(props.userData).toEqual(firstUser);
    });

    test('if recipe doesnt exist return not found', async () => {
        const notFound = (await getServerSideProps(contextParams.nonExistingUser)).notFound;
        expect(notFound).toEqual(true);
    });
    test('should return matching props', async () => {
        const props = (await getServerSideProps(contextParams.firstExistingUser)).props;
        expect(props.userData).toEqual(firstUser);
    });
});

describe('UserDetails - my profile', () => {
    let initialState = {
        userReducer: {
            loggedUserData: { id: firstUser.id, email: firstUser.email, name: firstUser.name },
        },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { userData } = (await getServerSideProps(contextParams.firstExistingUser)).props;
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
        const userEmail = screen.getByText(/firstEmail/i);
        const userName = screen.getByText(/firstName/i);

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
        userReducer: {
            requestedUserData: { id: firstUser.id, email: firstUser.email, name: firstUser.name },
        },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { userData } = (await getServerSideProps(contextParams.firstExistingUser)).props;

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
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(firstUser.id);
    });
    test('should render the user details ', () => {
        const userEmail = screen.getByText(/firstEmail/i);
        const userName = screen.getByText(/firstName/i);

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
