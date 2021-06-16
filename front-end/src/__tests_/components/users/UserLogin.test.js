// TODO - test redirect after login
// TODO - test submit calls loginAction

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import LoginPage from '../../../components/users/UserLogin';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Router>
                <LoginPage />
            </Router>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('LoginPage', () => {
    test('renders without crashing', () => {});
    test('render loginPage', () => {
        const loginPage = screen.getByTestId('loginPage');
        expect(loginPage).toBeInTheDocument();
    });
    test('renders email text box', () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput.required).toBe(true);
    });
    test('email value change according to input', () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        userEvent.type(emailInput, 'test@gmail.com');
        expect(emailInput.value).toBe('test@gmail.com');
    });
    test('renders password text box', () => {
        const passwordInput = screen.getByPlaceholderText(/password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput.required).toBe(true);
    });
    test('password value change according to input', () => {
        const passwordInput = screen.getByPlaceholderText(/password/i);
        userEvent.type(passwordInput, '123456');
        expect(passwordInput.value).toBe('123456');
    });
    test('renders submit button', () => {
        const submitButton = screen.getByRole('button', { name: 'Login' });
        expect(submitButton).toBeInTheDocument();
    });
});

// TODO - imporve this tests by checking the redirection url (should be home page)
describe('LoginPage - redirect', () => {
    beforeEach(() => {
        cleanup();
    });
    test('should redirect authenticated user', async () => {
        store.dispatch({ type: 'LOGIN_SUCCESS', payload: { isAuthenticatedData: true } });
        render(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        );
        const loginPage = screen.queryByTestId('loginPage');
        expect(loginPage).not.toBeInTheDocument();
    });
    // test('should redirect after successful login', () => {});
});
