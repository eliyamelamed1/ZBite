// TODO - add tests for guest users

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserUpdate from '../../../components/users/UserUpdate';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { userUpdateAction } from '../../../redux/actions/userActions';

jest.mock('../../../redux/actions/userActions', () => ({ userUpdateAction: jest.fn() }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('authenticated users', () => {
    let initialState = { userReducer: { isUserAuthenticated: true } };
    const store = mockStore(initialState);
    const idValue = '5';

    const placeholders = {
        email: 'super@gmail.com',
        name: 'super',
    };
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserUpdate id={idValue} emailPlaceholder={placeholders.email} namePlaceholder={placeholders.name} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe('UserUpdate - General', () => {
        test('should render withour crashing', () => {});
        test('data-testid match userUpdate', () => {
            const testid = screen.getByTestId('userUpdate');
            expect(testid).toBeInTheDocument();
        });
    });

    describe('UserUpdate - update button (open update form button) ', () => {
        test('should render update button', () => {
            const openUpdateForm = screen.getByRole('button', { name: /update/i });
            expect(openUpdateForm).toBeInTheDocument();
        });
        test('button type should be type button', () => {
            const openUpdateForm = screen.getByRole('button', { name: /update/i });
            expect(openUpdateForm.type).toBe('button');
        });
    });

    describe('open update form ', () => {
        beforeEach(() => {
            const openFormButton = screen.getByRole('button', { name: /update/i });
            userEvent.click(openFormButton);
        });
        describe('name input', () => {
            test('render name textbox', () => {
                const nameInput = screen.getByPlaceholderText(placeholders.name);
                expect(nameInput).toBeInTheDocument();
            });
            test('name attributes', () => {
                const nameInput = screen.getByPlaceholderText(placeholders.name);

                expect(nameInput.required).toBe(true);
                expect(nameInput.type).toBe('text');
                expect(nameInput.name).toBe('name');
            });
            test('name value change according to input (onchange)', () => {
                const nameInput = screen.getByPlaceholderText(placeholders.name);

                userEvent.type(nameInput, 'new name');
                expect(nameInput.value).toBe('new name');
            });
        });

        describe('email input', () => {
            test('render email textbox', () => {
                const emailInput = screen.getByPlaceholderText(placeholders.email);

                expect(emailInput).toBeInTheDocument();
            });
            test('email attributes', () => {
                const emailInput = screen.getByPlaceholderText(placeholders.email);
                expect(emailInput.required).toBe(true);
                expect(emailInput.type).toBe('text');
                expect(emailInput.name).toBe('email');
            });
            test('email value change according to input (onchange)', () => {
                const emailInput = screen.getByPlaceholderText(placeholders.email);
                userEvent.type(emailInput, 'new email');
                expect(emailInput.value).toBe('new email');
            });
        });

        describe('UserUpdate - submit button', () => {
            test('should render submit button', () => {
                const submitButton = screen.getByRole('button', { name: /submit/i });
                expect(submitButton).toBeInTheDocument();
            });
            test('button type should be type button', () => {
                const submitButton = screen.getByRole('button', { name: /submit/i });
                expect(submitButton.type).toBe('submit');
            });
        });

        describe('onSubmit - should dispatch UserUpdateAction ', () => {
            test('submit should call UserUpdateAction', () => {
                const emailInput = screen.getByPlaceholderText(placeholders.email);
                const nameInput = screen.getByPlaceholderText(placeholders.name);

                const submitButton = screen.getByRole('button', { name: /submit/i });

                const emailValue = 'testuser@gmail.com';
                const nameValue = 'testuser';

                userEvent.type(emailInput, emailValue);
                userEvent.type(nameInput, nameValue);
                userEvent.click(submitButton);

                const timesActionDispatched = userUpdateAction.mock.calls.length;

                expect(timesActionDispatched).toBe(1);
                expect(userUpdateAction.mock.calls[0][0].email).toEqual(emailValue);
                expect(userUpdateAction.mock.calls[0][0].name).toEqual(nameValue);
                expect(userUpdateAction.mock.calls[0][0].id).toEqual(idValue);
            });
        });
    });
});
