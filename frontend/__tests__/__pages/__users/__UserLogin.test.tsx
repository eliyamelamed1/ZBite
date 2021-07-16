// TODO - test redirect after login

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import UserLogin from '../../../pages/users/UserLogin';
import configureStore from 'redux-mock-store';
import { loginAction } from '../../../redux/actions/auth';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = { authReducer: {} };
const store = mockStore(initialState);
jest.mock('../../../redux/actions/auth', () => ({ loginAction: jest.fn().mockImplementation(() => true) }));
jest.mock('next/router', () => ({ push: jest.fn() }));
describe('UserLogin - guest', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserLogin />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('renders without crashing', () => {});
    test('render userLogin', () => {
        const userLogin = screen.getByTestId('userLogin');
        expect(userLogin).toBeInTheDocument();
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
        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(loginButton).toBeInTheDocument();
    });
    test('Redux - login button dispatch loginAction', () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: 'Login' });

        userEvent.type(emailInput, 'test@gmail.com');
        userEvent.type(passwordInput, '1234567');
        userEvent.click(loginButton);

        expect(loginAction.mock.calls.length).toBe(1);
    });
    test('Redux - email and password should pass to the loginAction', () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: 'Login' });

        const emailValue = 'test@gmail.com';
        const passwordValue = '1234567';

        userEvent.type(emailInput, emailValue);
        userEvent.type(passwordInput, passwordValue);
        userEvent.click(loginButton);

        const timesActionDispatched = loginAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loginAction.mock.calls[0][0].email).toEqual(emailValue);
        expect(loginAction.mock.calls[0][0].password).toEqual(passwordValue);
    });
});

// TODO - imporve this tests by checking the redirection url (should be home page)
describe('UserLogin - authenticated user', () => {
    let initialState = { authReducer: { isAuthenticatedData: true } };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserLogin />
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });
    test('should redirect authenticated user to home page', async () => {
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe('/');
    });
});
