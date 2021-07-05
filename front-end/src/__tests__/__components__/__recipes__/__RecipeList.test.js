import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeList from '../../../components/recipes/RecipeList';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { loadRecipeListAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';

jest.mock('../../../redux/actions/recipe', () => ({ loadRecipeListAction: jest.fn() }));
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
describe('RecipeList', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <RecipeList />
                </Router>
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });
    test('renders without crashing', () => {});
    test('should render RecipeList component', () => {
        const RecipeList = screen.getByTestId('recipeList');
        expect(RecipeList).toBeInTheDocument();
    });
    test('should render DisplayRecipes component', () => {
        const DisplayRecipes = screen.getByTestId('displayRecipes');
        expect(DisplayRecipes).toBeInTheDocument();
    });
    test('should dispatch loadRecipeListAction', () => {
        const timesActionDispatched = loadRecipeListAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
    });
});
