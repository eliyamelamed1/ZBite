import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import Layout from '../../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../../redux/store';

jest.mock('next/router', () => ({
    push: jest.fn(),
    useRouter: jest.fn(() => ({
        pathName: 'pathName',
        asPath: 'asPath',
    })),
}));

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
});
