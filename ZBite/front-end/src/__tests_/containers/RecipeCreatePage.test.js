import React from 'react';
import RecipeCreatePage from '../../containers/RecipeCreatePage';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store';

beforeEach(() => {
    render(
        <Provider store={store}>
            <RecipeCreatePage />
        </Provider>
    );
});
afterEach(() => {
    cleanup();
});

describe('RecipeCreatePage', () => {
    test('renders without crashing', () => {});
    test('contains RecipeCreate componenet', () => {
        expect(screen.getByTestId('recipeCreate')).toBeInTheDocument();
    });
});
