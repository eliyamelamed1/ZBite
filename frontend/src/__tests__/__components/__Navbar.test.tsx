import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Navbar from '../../components/Navbar';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { logoutAction } from '../../redux/actions/userActions';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

jest.mock('../../redux/actions/userActions', () => ({ logoutAction: jest.fn() }));
jest.mock('next/router', () => ({
    push: jest.fn(),
    useRouter: jest.fn(() => ({
        pathName: 'pathName',
        asPath: 'asPath',
    })),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('asda', () => {
    describe('NavBar - authenticated users', () => {
        const initialState = {
            userReducer: { isUserAuthenticated: true, loggedUserData: { email: 'testemail@gmail.com', id: 'userId' } },
            recipeReducer: {
                listOfAutoCompleteRecipes: [
                    {
                        id: 'id',
                        title: 'title',
                        description: 'description',
                        stars: '5.0',
                        score: '2.0',
                        saves: '5',
                        photo_main: null,
                    },
                ],
            },
        };
        const store = mockStore(initialState);
        beforeEach(() => {
            cleanup();
            render(
                <Provider store={store}>
                    <Navbar />
                </Provider>
            );
        });
        test('renders without crashing', () => {});
        test('should display NavbarLinks', () => {
            const NavbarLinks = screen.getByTestId('NavbarLinks');
            expect(NavbarLinks).toBeInTheDocument();
        });
        test('should display home button', () => {
            const homeLink = screen.getByText(/home/i);
            expect(homeLink).toBeInTheDocument();
        });
        test('NavbarLinks should contain valid profile link', () => {
            const profileLink = screen.getByRole('link', { name: /profile/i });
            const userId = store.getState().userReducer.loggedUserData.id;
            expect(profileLink).toBeInTheDocument();
            expect(profileLink.href).toEqual(`http://localhost/users/${userId}`);
        });
        test('logout button should appear', async () => {
            const logoutButton = await screen.findByRole('button', { name: /logout/i });
            expect(logoutButton).toBeInTheDocument();
        });
        test('logout button should dispatch logoutAction', async () => {
            const logoutButton = screen.getByRole('button', { name: /logout/i });
            userEvent.click(logoutButton);

            const timesActionDispatched = await logoutAction.mock.calls.length;
            expect(timesActionDispatched).toBe(1);
        });
    });

    describe('NavBar - guest users', () => {
        const initialState = {
            userReducer: { isUserAuthenticated: false },
            recipeReducer: {
                listOfAutoCompleteRecipes: [
                    {
                        id: 'id',
                        title: 'title',
                        description: 'description',
                        stars: '5.0',
                        score: '2.0',
                        saves: '5',
                        photo_main: null,
                    },
                ],
            },
        };
        const store = mockStore(initialState);
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <Navbar />
                </Provider>
            );
        });
        test('should render without crashing', () => {});
        test('should display NavbarLinks', () => {
            const NavbarLinks = screen.getByTestId('NavbarLinks');
            expect(NavbarLinks).toBeInTheDocument();
        });
        test('should display home button', () => {
            const homeLink = screen.getByText(/home/i);
            expect(homeLink).toBeInTheDocument();
        });
        test('profile button should redirect to login page', () => {
            const profileLink = screen.getByRole('link', { name: /profile/i });
            expect(profileLink).toBeInTheDocument();
            expect(profileLink.href).toEqual(`http://localhost/users/UserLogin`);
        });
        test('page should display singup and login links', () => {
            const signupLink = screen.getByRole('link', { name: /sign up/i });
            const loginLink = screen.getByRole('link', { name: /login/i });

            expect(signupLink).toBeInTheDocument();
            expect(loginLink).toBeInTheDocument();
        });
        test('signup and login links match their url', () => {
            const signupLink = screen.getByRole('link', { name: /sign up/i });
            const loginLink = screen.getByRole('link', { name: /login/i });

            expect(signupLink.href).toBe('http://localhost/users/UserSignup');
            expect(loginLink.href).toBe('http://localhost/users/UserLogin');
        });
    });
});
