// TODO - test reset password button call onSubmit
// TODO - test onSubmit work as expected
// TODO - test redirect to home after reset password

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserResetPasswordConfirm from '../../../components/users/UserResetPasswordConfirm';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    render(
        <Provider store={store}>
            <UserResetPasswordConfirm />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('UserResetPasswordConfirm', () => {
    test('renders without crashing', () => {});
});

describe('UserResetPasswordConfirm - new password input', () => {
    test('renders password box', () => {
        const passwordTextbox = screen.getByPlaceholderText('New password');
        expect(passwordTextbox).toBeInTheDocument();
    });
    test('password input should be required', () => {
        const passwordTextbox = screen.getByPlaceholderText('New password');
        expect(passwordTextbox.required).toBe(true);
    });
    test('password value should change according to input ', () => {
        const passwordTextbox = screen.getByPlaceholderText('New password');
        userEvent.type(passwordTextbox, 'test123456');
        expect(passwordTextbox.value).toBe('test123456');
    });
});

describe('UserResetPasswordConfirm - confirm new password input', () => {
    test('renders password box', () => {
        const passwordTextbox = screen.getByPlaceholderText('Confirm New Password');
        expect(passwordTextbox).toBeInTheDocument();
    });
    test('password input should be required', () => {
        const passwordTextbox = screen.getByPlaceholderText('Confirm New Password');
        expect(passwordTextbox.required).toBe(true);
    });
    test('password value should change according to input ', () => {
        const passwordTextbox = screen.getByPlaceholderText('Confirm New Password');
        userEvent.type(passwordTextbox, 'test123456');
        expect(passwordTextbox.value).toBe('test123456');
    });
});

describe('UserResetPasswordConfirm - reset password button', () => {
    test('should render register button', () => {
        const button = screen.getByRole('button', { name: 'Reset Password' });
        expect(button).toBeInTheDocument();
    });
});
