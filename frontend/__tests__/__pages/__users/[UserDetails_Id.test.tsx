import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserDetails_Id from '../../../pages/users/[UserDetails_Id]';
import configureStore from 'redux-mock-store';
import { loadUserDetailsAction } from '../../../redux/actions/auth';
import thunk from 'redux-thunk';
import { useRouter } from 'next/router';

const params = {
    firstUserId: 'firstUserId',
    secondUserId: 'secondUserId',
    nonExistingId: 'nonExistingId',
    email: 'testEmail',
    name: 'testName',
};
jest.mock('../../../redux/actions/auth', () => ({ loadUserDetailsAction: jest.fn() }));

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        query: { UserDetails_Id: params.firstUserId },
    })),
}));
describe('UserDetails - author (profile page)', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: params.firstUserId, email: params.email, name: params.name } },
    };
    let store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserDetails_Id />
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
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(params.firstUserId);
    });
    test('should render the user details ', () => {
        const userEmail = screen.getByText(/testEmail/i);
        const userName = screen.getByText(/testName/i);

        expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
    });
    test('should render authorLinks', () => {
        const authorLinks = screen.getByTestId('authorLinks');

        expect(authorLinks).toBeInTheDocument();
    });
    test('should render UserUpdate component', () => {
        const userUpdateTestId = screen.getByTestId('userUpdate');

        expect(userUpdateTestId).toBeInTheDocument();
    });
    test('should render UserDelete component', () => {
        const userDeleteTestId = screen.getByTestId('userDelete');

        expect(userDeleteTestId).toBeInTheDocument();
    });
    test('should not render NotFound', () => {
        const custom404TestId = screen.queryByTestId('custom404');

        expect(custom404TestId).not.toBeInTheDocument();
    });
});

describe('UserDetails - not author', () => {
    let initialState = {
        authReducer: { userDetailsData: { id: params.secondUserId, email: params.email, name: params.name } },
    };
    let store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserDetails_Id />
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
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(params.firstUserId);
    });
    test('should render the user details ', () => {
        const userEmail = screen.getByText(/testEmail/i);
        const userName = screen.getByText(/testName/i);

        expect(userEmail).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
    });
    test('should render guestLinks', () => {
        const guestLinks = screen.getByTestId('guestLinks');
        expect(guestLinks).toBeInTheDocument();
    });
    test('hould not render UserUpdate component', () => {
        const userUpdateTestId = screen.queryByTestId('userUpdate');

        expect(userUpdateTestId).not.toBeInTheDocument();
    });
    test('should not render UserDelete component', () => {
        const userDeleteTestId = screen.queryByTestId('userDelete');

        expect(userDeleteTestId).not.toBeInTheDocument();
    });
    test('should not render NotFound', () => {
        const custom404TestId = screen.queryByTestId('custom404');

        expect(custom404TestId).not.toBeInTheDocument();
    });
});

describe('UserDetails - Non-existing user ', () => {
    beforeEach(() => {
        let initialState = {
            authReducer: { loggedUserData: { id: params.nonExistingId, email: params.email, name: params.name } },
        };
        let store = mockStore(initialState);
        render(
            <Provider store={store}>
                <UserDetails_Id />
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('should render NotFound', () => {
        const custom404TestId = screen.getByTestId('custom404');

        expect(custom404TestId).toBeInTheDocument();
    });
});
