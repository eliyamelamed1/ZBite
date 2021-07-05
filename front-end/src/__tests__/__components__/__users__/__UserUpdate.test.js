// TODO - add tests for guest users

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserUpdate from '../../../components/users/UserUpdate';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { userUpdateAction } from '../../../redux/actions/auth';

jest.mock('../../../redux/actions/auth', () => ({ userUpdateAction: jest.fn() }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('authenticated users', () => {
    let initialState = { authReducer: { isAuthenticatedData: true } };
    const store = mockStore(initialState);
    const idValue = '5';
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserUpdate id={idValue} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    });

    describe('UserUpdate - General', () => {
        test('should render withour crashing', () => {});
        test('data-testid match userUpdate', () => {
            const testid = screen.getByTestId('userUpdate');
            expect(testid).toBeInTheDocument();
        });
    });
    describe('name input', () => {
        test('render name textbox', () => {
            const nameInput = screen.getByPlaceholderText(/name/i);
            expect(nameInput).toBeInTheDocument();
        });
        test('name attributes', () => {
            const nameInput = screen.getByPlaceholderText(/name/i);
            expect(nameInput.required).toBe(true);
            expect(nameInput.type).toBe('text');
            expect(nameInput.name).toBe('name');
        });
        test('name value change according to input (onchange)', () => {
            const nameInput = screen.getByPlaceholderText(/name/i);
            userEvent.type(nameInput, 'new name');
            expect(nameInput.value).toBe('new name');
        });
    });

    describe('email input', () => {
        test('render email textbox', () => {
            const emailInput = screen.getByPlaceholderText(/email/i);
            expect(emailInput).toBeInTheDocument();
        });
        test('email attributes', () => {
            const emailInput = screen.getByPlaceholderText(/email/i);
            expect(emailInput.required).toBe(true);
            expect(emailInput.type).toBe('text');
            expect(emailInput.name).toBe('email');
        });
        test('email value change according to input (onchange)', () => {
            const emailInput = screen.getByPlaceholderText(/email/i);
            userEvent.type(emailInput, 'new email');
            expect(emailInput.value).toBe('new email');
        });
    });

    describe('UserUpdate - update button', () => {
        test('should render update button', () => {
            const updateButton = screen.getByRole('button', { name: /update/i });
            expect(updateButton).toBeInTheDocument();
        });
        test('button type should be type submit', () => {
            const updateButton = screen.getByRole('button', { name: /update/i });
            expect(updateButton.type).toBe('submit');
        });
    });

    describe('onSubmit - should dispatch UserUpdateAction ', () => {
        test('submit should call UserUpdateAction', () => {
            const emailInput = screen.getByPlaceholderText(/email/i);
            const nameInput = screen.getByPlaceholderText(/name/i);
            const updateButton = screen.getByRole('button', { name: /update/i });

            const emailValue = 'testuser@gmail.com';
            const nameValue = 'testuser';

            userEvent.type(emailInput, emailValue);
            userEvent.type(nameInput, nameValue);
            userEvent.click(updateButton);

            const timesActionDispatched = userUpdateAction.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(userUpdateAction.mock.calls[0][0].email).toEqual(emailValue);
            expect(userUpdateAction.mock.calls[0][0].name).toEqual(nameValue);
            expect(userUpdateAction.mock.calls[0][0].id).toEqual(idValue);
        });
    });
});
