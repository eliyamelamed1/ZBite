// TODO test loadLoggedUserDetailsAction() is called

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';

beforeEach(() => {
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

describe('expected dispatched redux actions', () => {
    beforeEach(() => {
        store.subscribe(() => {
            const action = store.getState().dispatchedActions;
            localStorage.setItem(action.type, action.payload);
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
    });
    test('loadLoggedUserDetailsAction should have been dispatched', () => {
        expect(localStorage.USER_LOADED_FAIL).toBeTruthy();
    });
    test('connectSocket should have been dispatched', () => {
        expect(localStorage.CONNECT_SOCKET).toBeTruthy();
    });
});
