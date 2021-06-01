// TODO - test reset password button call onSubmit
// TODO - test onSubmit work as expected
// TODO - test redirect to home after seding reset password email

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ResetPasswordPage from '../../containers/ResetPasswordPage';
import store from '../../store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

beforeEach(() => {
    render(
        <Provider store={store}>
            <ResetPasswordPage />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('ResetPasswordPage', () => {
    test('renders without crashing', () => {});
});

describe('ResetPasswordPage - email input', () => {
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

describe('ResetPasswordPage - send reset password email button', () => {
    test('button should render ', () => {
        const button = screen.getByRole('button', { name: 'Send Password Reset' });
        expect(button).toBeInTheDocument();
    });
    test('button type should be submit ', () => {
        const button = screen.getByRole('button', { name: 'Send Password Reset' });
        expect(button.type).toBe('submit');
    });
});
