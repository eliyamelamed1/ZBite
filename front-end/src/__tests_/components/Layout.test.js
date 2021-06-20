// TODO test loadLoggedUserDetailsAction() is called

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { USER_LOADED_FAIL } from '../../redux/actions/types';
import store from '../../redux/store';

beforeEach(() => {
    store.subscribe(() => {
        const action = store.getState().dispatchedActions;
        localStorage.setItem(action.type, action.type);
    });
    render(
        <Provider store={store}>
            <Router>
                <Layout>
                    <div>children</div>
                </Layout>
            </Router>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
    window.localStorage.clear();
});

describe('Layout', () => {
    test('renders without crashing', () => {});
    test('renders children', () => {
        const children = screen.getByText('children');
        expect(children).toBeInTheDocument();
    });
    test('render navbar component', () => {
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    });
});

describe('dispatched actions', () => {
    test('loadLoggedUserDetailsAction should have been dispatched', () => {
        expect(localStorage.USER_LOADED_FAIL).toBeTruthy();
    });
    test('connectSocket should have been dispatched', () => {
        expect(localStorage.CONNECT_SOCKET).toBeTruthy();
    });
});
