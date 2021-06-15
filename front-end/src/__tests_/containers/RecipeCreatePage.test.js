import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeCreatePage from '../../containers/recipes/RecipeCreatePage';
import store from '../../redux/store';

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
