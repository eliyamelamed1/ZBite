// TODO - test reset password button call onSubmit
// TODO - test onSubmit work as expected
// TODO - test redirect to home after seding reset password email

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserResetPassword from '../../../components/users/UserResetPassword';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    render(
        <Provider store={store}>
            <UserResetPassword />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('UserResetPassword', () => {
    test('renders without crashing', () => {});
});

describe('UserResetPassword - email input', () => {
    test('should render email text box', () => {
        const emailTextbox = screen.getByPlaceholderText('Email');
        expect(emailTextbox).toBeInTheDocument();
        expect(emailTextbox.required).toBe(true);
    });
    test('email input should be required', () => {
        const emailTextbox = screen.getByPlaceholderText('Email');
        expect(emailTextbox.required).toBe(true);
    });
    test('email value should change according to input ', () => {
        const emailTextbox = screen.getByPlaceholderText('Email');
        userEvent.type(emailTextbox, 'test@gmail.com');
        expect(emailTextbox.value).toBe('test@gmail.com');
    });
});

describe('UserResetPassword - send reset password email button', () => {
    test('button should render ', () => {
        const button = screen.getByRole('button', { name: 'Send Password Reset' });
        expect(button).toBeInTheDocument();
    });
    test('button type should be submit ', () => {
        const button = screen.getByRole('button', { name: 'Send Password Reset' });
        expect(button.type).toBe('submit');
    });
});
