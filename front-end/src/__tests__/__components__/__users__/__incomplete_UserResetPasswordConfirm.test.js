// TODO - test reset password button call onSubmit
// TODO - test onSubmit work as expected
// TODO - test redirect to home after reset password

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserResetPasswordConfirm from '../../../components/users/UserResetPasswordConfirm';
import { resetPasswordConfirmAction } from '../../../redux/actions/auth';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

jest.mock('../../../redux/actions/auth', () => ({ resetPasswordConfirmAction: jest.fn() }));
const props = {
    match: {
        params: {
            uid: 'MGQ5ZGQ4ZWUtMTBjZS00Y2NhLWJhM2UtY2JhZGYwMTIyMmJh',
            token: 'ap65vh-89b3de6f0de10203e42495277a6a245b',
        },
    },
};
beforeEach(() => {
    render(
        <Provider store={store}>
            <Router>
                <UserResetPasswordConfirm props={props} />
            </Router>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

// describe('UserResetPasswordConfirm - new password input', () => {
//     test('renders without crashing', () => {});
//     test('renders password box', () => {
//         const newPasswordTextbox = screen.getByPlaceholderText('New password');
//         expect(newPasswordTextbox).toBeInTheDocument();
//     });
//     test('password input should be required', () => {
//         const newPasswordTextbox = screen.getByPlaceholderText('New password');
//         expect(newPasswordTextbox.required).toBe(true);
//     });
//     test('password value should change according to input ', () => {
//         const newPasswordTextbox = screen.getByPlaceholderText('New password');
//         userEvent.type(newPasswordTextbox, 'test123456');
//         expect(newPasswordTextbox.value).toBe('test123456');
//     });
// });

// describe('UserResetPasswordConfirm - confirm new password input', () => {
//     test('renders password box', () => {
//         const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
//         expect(confirmPasswordTextbox).toBeInTheDocument();
//     });
//     test('password input should be required', () => {
//         const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
//         expect(confirmPasswordTextbox.required).toBe(true);
//     });
//     test('password value should change according to input ', () => {
//         const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
//         userEvent.type(confirmPasswordTextbox, 'test123456');
//         expect(confirmPasswordTextbox.value).toBe('test123456');
//     });
// });

describe('submit button', () => {
    test('should render reset password button button', () => {
        const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
        expect(resetPasswordButton).toBeInTheDocument();
    });
    test('submitting form should dispatch resetPasswordConfirmAction', async () => {
        // const newPasswordTextbox = screen.getByPlaceholderText('New password');
        // const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        // const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
        // const passwordValue = 'newPassword123';
        // userEvent.type(newPasswordTextbox, passwordValue);
        // userEvent.type(confirmPasswordTextbox, passwordValue);
        // userEvent.click(resetPasswordButton);
        // const timesActionDispatched = await resetPasswordConfirmAction.mock.calls.length;
        // expect(timesActionDispatched).toBe(1);
        // expect(await resetPasswordConfirmAction.mock.calls[0][0].uid).toBe('123');
    });
});
