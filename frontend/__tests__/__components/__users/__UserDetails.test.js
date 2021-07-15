import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserDetails from '../../../components/users/UserDetails';
import configureStore from 'redux-mock-store';
import { loadUserDetailsAction } from '../../../redux/actions/auth';
import thunk from 'redux-thunk';

jest.mock('../../../redux/actions/auth', () => ({ loadUserDetailsAction: jest.fn() }));
const middleware = [thunk];
const mockStore = configureStore(middleware);
const match = {
    params: {
        id: 'authorId',
    },
};
describe('UserDetails - author (profile page)', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: 'authorId', email: 'testEmail', name: 'testName' } },
    };
    let store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <UserDetails match={match} />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const userDetailsTestId = screen.getByTestId('userDetails');
        expect(userDetailsTestId).toBeInTheDocument();
    });
    test('should dispatch loadUserDetailsAction', () => {
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(match.params.id);
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
        const notFoundTestId = screen.queryByTestId('notFound');

        expect(notFoundTestId).not.toBeInTheDocument();
    });
});

describe('UserDetails - not author', () => {
    let initialState = {
        authReducer: { userDetailsData: { id: 'guestId', email: 'testEmail', name: 'testName' } },
    };
    let store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <UserDetails match={match} />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    });
    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const userDetailsTestId = screen.getByTestId('userDetails');
        expect(userDetailsTestId).toBeInTheDocument();
    });
    test('should dispatch loadUserDetailsAction', () => {
        const timesActionDispatched = loadUserDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadUserDetailsAction.mock.calls[0][0].id).toBe(match.params.id);
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
        const notFoundTestId = screen.queryByTestId('notFound');

        expect(notFoundTestId).not.toBeInTheDocument();
    });
});

describe('UserDetails - Non-existing user ', () => {
    beforeEach(() => {
        let initialState = {
            authReducer: { loggedUserData: { id: 'wrongId', email: 'testEmail', name: 'testName' } },
        };
        let store = mockStore(initialState);
        render(
            <Provider store={store}>
                <Router>
                    <UserDetails match={match} />
                </Router>
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });

    test('should render NotFound', () => {
        const notFoundTestId = screen.getByTestId('notFound');

        expect(notFoundTestId).toBeInTheDocument();
    });
});
