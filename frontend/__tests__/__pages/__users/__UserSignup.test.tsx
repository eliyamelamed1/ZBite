import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import UserSignup from '../../../pages/users/UserSignup';
import configureStore from 'redux-mock-store';
import { pageRoute } from '../../../enums';
import { signupAction } from '../../../redux/actions/userActions';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {
    userReducer: {},
};
const store = mockStore(initialState);
jest.mock('../../../redux/actions/userActions', () => ({
     signupAction: jest.fn().mockReturnValue(()=> true) 
}));


jest.mock('next/router');
describe('UserSignup - guest user', () => {
    
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserSignup />
            </Provider>
        );
    });
    
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    
    describe('UserSignup - general', () => {
        test('renders without crashing', () => {});
        test('should render Already have an account? linking to the login page', () => {
            const signIn = screen.getByRole('link', { name: /Sign in/i });
            expect(signIn).toBeInTheDocument();
            expect(signIn.href).toBe('http://localhost' + pageRoute().login);
        });
    });
    
    describe('UserSignup- name input', () => {
        test('renders name text box', () => {
            const nameTextbox = screen.getByPlaceholderText(/full Name/i);
            expect(nameTextbox).toBeInTheDocument();
        });
        test('name input should be required', () => {
            const nameTextbox = screen.getByPlaceholderText(/full Name/i);
            expect(nameTextbox.required).toBe(true);
        });
        test('name value should change according to input ', () => {
            const nameTextbox = screen.getByPlaceholderText(/full Name/i);
            userEvent.type(nameTextbox, 'testName');
            expect(nameTextbox.value).toBe('testName');
        });
    });
    
    describe('UserSignup- email input', () => {
        test('renders email text box', () => {
            const emailTextbox = screen.getByPlaceholderText(/email/i);
            expect(emailTextbox).toBeInTheDocument();
            expect(emailTextbox.required).toBe(true);
        });
        test('email input should be required', () => {
            const emailTextbox = screen.getByPlaceholderText(/email/i);
            expect(emailTextbox.required).toBe(true);
        });
        test('email value should change according to input ', () => {
            const emailTextbox = screen.getByPlaceholderText(/email/i);
            userEvent.type(emailTextbox, 'test@gmail.com');
            expect(emailTextbox.value).toBe('test@gmail.com');
        });
    });
    
    describe('UserSignup- password input', () => {
        test('renders password box', () => {
                                    const passwordTextbox = screen.getByPlaceholderText('Password');
            expect(passwordTextbox).toBeInTheDocument();
        });
        test('password input should be required', () => {
                                                const passwordTextbox = screen.getByPlaceholderText('Password');
            expect(passwordTextbox.required).toBe(true);
        });
        test('password value should change according to input ', () => {
                                                const passwordTextbox = screen.getByPlaceholderText('Password');
            userEvent.type(passwordTextbox, 'test123456');
            expect(passwordTextbox.value).toBe('test123456');
        });
    });
    
    describe('UserSignup- confirm password input', () => {
        test('renders confirm password box', () => {
            const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm Password');

            expect(confirmPasswordTextbox).toBeInTheDocument();
        });
        test('confirm password input should be required', () => {
            const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm Password');


            expect(confirmPasswordTextbox.required).toBe(true);
        });
        test('confirm password value should change according to input ', () => {
            const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm Password');

            userEvent.type(confirmPasswordTextbox, 'test123456');
            expect(confirmPasswordTextbox.value).toBe('test123456');
        });
    });
    
    describe('UserSignup- signupForm form', () => {
        test('should render register button', () => {
            const button = screen.getByRole('button', { name: 'Register' });
            expect(button).toBeInTheDocument();
        });
        test('signup should dispatch signupAction', async () => {
            const nameTextbox = screen.getByPlaceholderText(/full Name/i);
            const emailTextbox = screen.getByPlaceholderText(/email/i);
            const passwordTextbox = screen.getByPlaceholderText('Password');
            const confirmPasswordTextbox = screen.getByPlaceholderText('Confirm Password');


            const signupButton = screen.getByRole('button', { name: 'Register' });
            
            const nameValue = 'testuser';
            const emailValue = 'testuser@gmail.com';
            const passwordValue = 'testuser123';
            const rePasswordValue = 'testuser123';
            
            userEvent.type(nameTextbox, nameValue);
            userEvent.type(emailTextbox, emailValue);
            userEvent.type(passwordTextbox, passwordValue);
            userEvent.type(confirmPasswordTextbox, rePasswordValue);
            userEvent.click(signupButton);
            
            const timesActionDispatched = await signupAction.mock.calls.length;
            
            expect(timesActionDispatched).toBe(1);
            expect(signupAction.mock.calls[0][0].name).toEqual(nameValue);
            expect(signupAction.mock.calls[0][0].email).toEqual(emailValue);
            expect(signupAction.mock.calls[0][0].password).toEqual(passwordValue);
            expect(signupAction.mock.calls[0][0].re_password).toEqual(rePasswordValue);
        });

    });
});


describe('UserSignup - authenticated users', () => {
    initialState = {
        userReducer: { isUserAuthenticated: true },
    };
    const store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <UserSignup />
            </Provider>
        );
    });
    test('should redirect authenticated user to home page', async () => {
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls.[0][0]).toBe(pageRoute().home);
    });
});

