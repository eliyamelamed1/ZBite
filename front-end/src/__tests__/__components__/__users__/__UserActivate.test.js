// TODO - test redirect to home after reset password

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserActivate from '../../../components/users/UserActivate';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';
import { verify } from '../../../redux/actions/auth';

jest.mock('../../../redux/actions/auth', () => ({ verify: jest.fn() }));
const match = {
    params: {
        uid: 'MGQ5ZGQ4ZWUtMTBjZS00Y2NhLWJhM2UtY2JhZGYwMTIyMmJh',
        token: 'ap65vh-89b3de6f0de10203e42495277a6a245b',
    },
};
beforeEach(() => {
    render(
        <Provider store={store}>
            <Router>
                <UserActivate match={match} />
            </Router>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('General', () => {
    test('renders without crashing', () => {});
    test('should match data-testid ', () => {
        const userActivateTestId = screen.getByTestId('userActivate');
        expect(userActivateTestId).toBeInTheDocument();
    });
});

describe('submit button', () => {
    test('should render Verify button', () => {
        const verifyAccountButton = screen.getByRole('button', { name: /verify/i });
        expect(verifyAccountButton).toBeInTheDocument();
    });
    test('submitting form should dispatch verify_account action', async () => {
        const verifyAccountButton = screen.getByRole('button', { name: /verify/i });

        userEvent.click(verifyAccountButton);
        const timesActionDispatched = verify.mock.calls.length;

        const userActivateTestId = screen.getByTestId('userActivate');

        expect(timesActionDispatched).toBe(1);
        expect(verify.mock.calls[0][0].uid).toBe(match.params.uid);
        expect(verify.mock.calls[0][0].token).toBe(match.params.token);
        expect(userActivateTestId).toBeInTheDocument();
    });
});
