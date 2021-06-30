// TODO - test action is dispatched with (email and name)

import '@testing-library/jest-dom';

import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import UserUpdate from '../../../components/users/UserUpdate';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    let initialState = {
        user: { email: 'testemail', name: 'testname', id: '5' },
    };
    store.dispatch({ type: 'USER_LOADED_SUCCESS', payload: initialState.user });
    const id = '5';
    store.subscribe(() => {
        const action = store.getState().dispatchedActions;
        localStorage.setItem(action.type, action.payload);
    });
    render(
        <Provider store={store}>
            <UserUpdate id={id} />
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

describe('UserUpdate - onSubmit', () => {
    test('submit should call UserUpdateAction', async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const nameInput = screen.getByPlaceholderText(/name/i);
        const updateButton = screen.getByRole('button', { name: /update/i });
        userEvent.type(emailInput, 'new email');
        userEvent.type(nameInput, 'new name');
        userEvent.click(updateButton);

        await waitFor(() => expect(localStorage.USER_UPDATED_FAIL).toBeTruthy());
    });
});
