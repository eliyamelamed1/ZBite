// TODO test loadLoggedUserDetailsAction() is called

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import Layout from '../../Layout/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';

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

describe('LAyout', () => {
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
