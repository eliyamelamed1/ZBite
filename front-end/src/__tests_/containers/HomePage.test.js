import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import HomePage from '../../containers/HomePage';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../../redux/store';

beforeEach(() => {
    render(
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
});
afterEach(() => {
    cleanup();
});

describe('HomePage', () => {
    test('renders without crashing', () => {});
    test('contains RecipeSearch componenet', () => {
        expect(screen.getByTestId('RecipeSearch')).toBeInTheDocument();
    });
});
