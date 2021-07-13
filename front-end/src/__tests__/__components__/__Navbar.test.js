import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Navbar from '../../components/Navbar';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { logoutAction } from '../../redux/actions/auth';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

jest.mock('../../redux/actions/auth', () => ({ logoutAction: jest.fn() }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('NavBar - authenticated users', () => {
    const initialState = {
        authReducer: { isAuthenticatedData: true, loggedUserData: { email: 'testemail@gmail.com', id: 'userId' } },
    };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Navbar />
                </Router>
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });
    test('renders without crashing', () => {});
    test('contain global link (home)', () => {
        const homeLink = screen.getByText(/home/i);
        expect(homeLink).toBeInTheDocument();
    });
    test('should contain authLinks', () => {
        const authLinks = screen.getByTestId('authLinks');
        expect(authLinks).toBeInTheDocument();
    });
    test('authLinks should contain logged user email,profile', () => {
        const loggedEmail = screen.getByText(/testemail@gmail.com/);

        expect(loggedEmail).toBeInTheDocument();
    });
    test('authLinks should contain valid profile link', () => {
        const profileLink = screen.getByRole('link', { name: /profile/i });
        const userId = store.getState().authReducer.loggedUserData.id;
        expect(profileLink).toBeInTheDocument();
        expect(profileLink.href).toEqual(`http://localhost/users/${userId}`);
    });
    test('should not contain guestLinks', () => {
        const guestLinks = screen.queryByTestId('guestLinks');
        expect(guestLinks).toBeNull();
    });
    test('logout button should appear on guestLinks', () => {
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
    });
    test('logout button should dispatch logoutAction', async () => {
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        userEvent.click(logoutButton);

        const timesActionDispatched = await logoutAction.mock.calls.length;
        expect(timesActionDispatched).toBe(1);
    });
});

describe('NavBar - guest users', () => {
    const initialState = {
        authReducer: { isAuthenticatedData: false },
    };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Navbar />
                </Router>
            </Provider>
        );
    });
    test('renders without crashing', () => {});
    test('contain global link (home)', () => {
        const homeLink = screen.getByText(/home/i);
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.href).toBe('http://localhost/');
    });
    test('contain guest links', () => {
        expect(screen.getByTestId('guestLinks')).toBeInTheDocument();
    });
    test('authLinks contains singup and login links', () => {
        const signupLink = screen.getByRole('link', { name: /sign up/i });
        const loginLink = screen.getByRole('link', { name: /login/i });

        expect(signupLink).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });
    test('should not contain authLinks', () => {
        const authLinks = screen.queryByTestId('authLinks');
        expect(authLinks).toBeNull();
    });

    test('signup and login links match their url', () => {
        const signupLink = screen.getByRole('link', { name: /sign up/i });
        const loginLink = screen.getByRole('link', { name: /login/i });

        expect(signupLink.href).toBe('http://localhost/signup');
        expect(loginLink.href).toBe('http://localhost/login');
    });
});
