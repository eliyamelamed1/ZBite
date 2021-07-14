// TODO test loadLoggedUserDetailsAction() is called

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { loadLoggedUserDetailsAction } from '../../redux/actions/auth';
import thunk from 'redux-thunk';

jest.mock('../../redux/actions/auth', () => ({ loadLoggedUserDetailsAction: jest.fn() }));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = { authReducer: {}, socketReducer: {} };
const store = mockStore(initialState);
beforeEach(() => {
    render(
        <Provider store={store}>
            <Layout>
                <div>children</div>
            </Layout>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
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
    test('loadLoggedUserDetailsAction should have been dispatched', async () => {
        const timesActionDispatched = await loadLoggedUserDetailsAction.mock.calls.length;
        expect(timesActionDispatched).toBe(1);
    });
});
