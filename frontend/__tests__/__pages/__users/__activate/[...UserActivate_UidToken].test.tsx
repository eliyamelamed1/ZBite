// TODO - test redirect to home after reset password

import '@testing-library/jest-dom';

import Router, { useRouter } from 'next/router';
import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserActivate from '../../../../pages/users/activate/[...UserActivate_UidToken]';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userActivateAction } from '../../../../redux/actions/user';
import userEvent from '@testing-library/user-event';

const dynamicUrlParams = {
    uid: 'MGQ5ZGQ4ZWUtMTBjZS00Y2NhLWJhM2UtY2JhZGYwMTIyMmJh',
    token: '89b3de6f0de10203e42495277a6a245b',
};
jest.mock('../../../../redux/actions/user', () => ({ userActivateAction: jest.fn().mockReturnValue(() => true) }));
jest.mock('next/router', () => ({
    push: jest.fn(),
    useRouter: jest.fn(() => ({
        query: {
            UserActivate_UidToken: [dynamicUrlParams.uid, dynamicUrlParams.token]
        },
    })),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Authenticated users', () => {
    let initialState = { userReducer: { isUserAuthenticated: true } };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserActivate />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
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
            const timesActionDispatched = userActivateAction.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(userActivateAction.mock.calls[0][0].uid).toBe(dynamicUrlParams.uid);
            expect(userActivateAction.mock.calls[0][0].token).toBe(dynamicUrlParams.token);
        });
        test('should redirect when user is activated', () => {
            const verifyAccountButton = screen.getByRole('button', { name: /verify/i });
            userEvent.click(verifyAccountButton);

            const timesActionDispatched = userActivateAction.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(Router.push.mock.calls.length).toBe(1);
            expect(Router.push.mock.calls[0][0]).toBe('/');
        });
    });
});

describe('Guest users', () => {
    let initialState = { userReducer: { isUserAuthenticated: false } };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserActivate />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should redirect guest users', () => {
        expect(Router.push.mock.calls.length).toBe(1)
        expect(Router.push.mock.calls.[0][0]).toBe('/')
    })
    
});
