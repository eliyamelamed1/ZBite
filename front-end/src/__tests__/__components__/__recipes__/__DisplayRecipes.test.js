// TODO - test DisplayRecipes with empty recipeListData

import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayRecipes from '../../../components/recipes/DisplayRecipes';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
let initialState = {
    recipeReducer: { recipeListData: [data, data2] },
};
const store = mockStore(initialState);
beforeEach(() => {
    render(
        <Provider store={store}>
            <Router>
                <DisplayRecipes />
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
