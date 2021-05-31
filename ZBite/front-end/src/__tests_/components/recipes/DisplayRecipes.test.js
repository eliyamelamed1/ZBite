import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayRecipes from '../../../components/recipes/DisplayRecipes';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../store';

beforeEach(() => {
    const data = {
        title: 'recipe title',
        flavor_type: 'Sour',
        photo_main: 'recipe image #',
        id: 'recipeId',
        author: 'recipe author',
    };
    const data2 = {
        title: 'recipe title2',
        flavor_type: 'Sour',
        photo_main: 'recipe image #2',
        id: 'recipeId2',
        author: 'recipe author2',
    };
    const recipes = [data, data2];
    render(
        <Provider store={store}>
            <Router>
                <DisplayRecipes recipes={recipes} />
            </Router>
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});

describe('DisplayRecipes', () => {
    test('should render without crashing', () => {});
    test('should display multiple recipes components', () => {
        const recipeCard = screen.queryAllByTestId('recipeCard');
        expect(recipeCard.length).toBe(2);
    });
    test('component data-testid should match displayRecipes', () => {
        const displayRecipes = screen.getByTestId('displayRecipes');
        expect(displayRecipes).toBeInTheDocument();
    });
});
