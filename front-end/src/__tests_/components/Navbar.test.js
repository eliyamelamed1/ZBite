// refactor tests (to many renders)

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Navbar from '../../components/Navbar';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';

afterEach(() => {
    cleanup();
});

describe('authenticated users', () => {
    beforeEach(() => {
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: { isAuthenticatedData: true } });
        store.dispatch({ type: 'LOAD_USER_SUCCUSS', payload: { user: { email: 'testemail@gmail.com' } } });
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
    });
    test('should contain authLinks', () => {
        const authLinks = screen.getByTestId('authLinks');
        expect(authLinks).toBeInTheDocument();
    });
    test('should not contain guestLinks', () => {
        const guestLinks = screen.queryByTestId('guestLinks');
        expect(guestLinks).toBeNull();
    });
    test('logout button should appear on guestLinks', () => {
        const logoutButton = screen.getByRole('button', { name: /logout/i });

        expect(logoutButton).toBeInTheDocument();
    });
});

describe('guest users', () => {
    beforeEach(() => {
        store.dispatch({ type: 'LOGOUT', payload: { isAuthenticatedData: false } });
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
