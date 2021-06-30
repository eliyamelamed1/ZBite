// TODO test loadLoggedUserDetailsAction() is called

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen, waitFor } from '@testing-library/react';

import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = { authReducer: {}, socketReducer: {} };
const store = mockStore(initialState);
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

describe('Layout - actions', () => {
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
    test('loadLoggedUserDetailsAction should have been dispatched', async () => {
        await waitFor(() => expect(store.getActions()[1].type).toBe('USER_LOADED_FAIL'));
    });
});
