// TODO - test redirect to home after reset password

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import UserResetPasswordConfirm from '../../../../pages/users/reset_password/[...UserResetPasswordConfirm_UidToken]';
import { pageRoute } from '../../../../globals';
import { resetPasswordConfirmAction } from '../../../../redux/actions/userActions';
import store from '../../../../redux/store';
import userEvent from '@testing-library/user-event';

const dynamicUrlParams = {
    uid: 'MGQ5ZGQ4ZWUtMTBjZS00Y2NhLWJhM2UtY2JhZGYwMTIyMmJh',
    token: '89b3de6f0de10203e42495277a6a245b',
};
jest.mock('../../../../redux/actions/userActions', () => ({
    resetPasswordConfirmAction: jest.fn().mockReturnValue(() => true),
}));
jest.mock('next/router', () => ({
    push: jest.fn(),
    useRouter: jest.fn(() => ({
        query: {
            UserResetPasswordConfirm_UidToken: [dynamicUrlParams.uid, dynamicUrlParams.token],
        },
    })),
}));
beforeEach(() => {
    render(
        <Provider store={store}>
            <UserResetPasswordConfirm />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('UserResetPasswordConfirm - new password input', () => {
    test('renders without crashing', () => {});
    test('renders password box', () => {
        const newPasswordTextbox = screen.getByPlaceholderText('New password');
        expect(newPasswordTextbox).toBeInTheDocument();
    });
    test('password input should be required', () => {
        const newPasswordTextbox = screen.getByPlaceholderText('New password');
        expect(newPasswordTextbox.required).toBe(true);
    });
    test('password value should change according to input ', () => {
        const newPasswordTextbox = screen.getByPlaceholderText('New password');
        userEvent.type(newPasswordTextbox, 'test123456');
        expect(newPasswordTextbox.value).toBe('test123456');
    });
});

describe('UserResetPasswordConfirm - confirm new password input', () => {
    test('renders password box', () => {
        const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        expect(confirmPasswordTextbox).toBeInTheDocument();
    });
    test('password input should be required', () => {
        const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        expect(confirmPasswordTextbox.required).toBe(true);
    });
    test('password value should change according to input ', () => {
        const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        userEvent.type(confirmPasswordTextbox, 'test123456');
        expect(confirmPasswordTextbox.value).toBe('test123456');
    });
});

describe('form submit', () => {
    test('should render reset password button button', () => {
        const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
        expect(resetPasswordButton).toBeInTheDocument();
    });
    test('successful form completion should call resetPasswordConfirmAction and redirect to home page ', async () => {
        const newPasswordTextbox = screen.getByPlaceholderText('New password');
        const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
        const passwordValue = 'newPassword123';

        userEvent.type(newPasswordTextbox, passwordValue);
        userEvent.type(confirmPasswordTextbox, passwordValue);
        userEvent.click(resetPasswordButton);
        const timesActionDispatched = resetPasswordConfirmAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(resetPasswordConfirmAction.mock.calls[0][0].uid).toBe(dynamicUrlParams.uid);
        expect(resetPasswordConfirmAction.mock.calls[0][0].token).toBe(dynamicUrlParams.token);
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe(pageRoute.home);
    });
    test('failed form completion should call resetPasswordConfirmAction and should not redirect ', async () => {
        resetPasswordConfirmAction.mockReturnValueOnce(() => {
            throw new Error();
        });
        const newPasswordTextbox = screen.getByPlaceholderText('New password');
        const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm New Password');
        const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
        const passwordValue = 'newPassword123';

        userEvent.type(newPasswordTextbox, passwordValue);
        userEvent.type(confirmPasswordTextbox, passwordValue);
        userEvent.click(resetPasswordButton);
        const timesActionDispatched = resetPasswordConfirmAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(resetPasswordConfirmAction.mock.calls[0][0].uid).toBe(dynamicUrlParams.uid);
        expect(resetPasswordConfirmAction.mock.calls[0][0].token).toBe(dynamicUrlParams.token);
        expect(Router.push.mock.calls.length).toBe(0);
    });
});
