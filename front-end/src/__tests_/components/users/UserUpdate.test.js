// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

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
        const textbox = screen.getByPlaceholderText(/name/i);
        expect(textbox).toBeInTheDocument();
    });
    test('name attributes', () => {
        const textbox = screen.getByPlaceholderText(/name/i);
        expect(textbox.required).toBe(true);
        expect(textbox.type).toBe('text');
        expect(textbox.name).toBe('name');
    });
    test('name value change according to input (onchange)', () => {
        const textbox = screen.getByPlaceholderText(/name/i);
        userEvent.type(textbox, 'new name');
        expect(textbox.value).toBe('new name');
    });
});

describe('email input', () => {
    test('render email textbox', () => {
        const textbox = screen.getByPlaceholderText(/email/i);
        expect(textbox).toBeInTheDocument();
    });
    test('email attributes', () => {
        const textbox = screen.getByPlaceholderText(/email/i);
        expect(textbox.required).toBe(true);
        expect(textbox.type).toBe('text');
        expect(textbox.name).toBe('email');
    });
    test('email value change according to input (onchange)', () => {
        const textbox = screen.getByPlaceholderText(/email/i);
        userEvent.type(textbox, 'new email');
        expect(textbox.value).toBe('new email');
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
