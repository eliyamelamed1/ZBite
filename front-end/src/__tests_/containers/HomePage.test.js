import React from 'react';
import HomePage from '../../containers/HomePage';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';

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
