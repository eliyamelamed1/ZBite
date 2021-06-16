import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeList from '../../../components/recipes/RecipeList';
import { act } from 'react-dom/test-utils';
import store from '../../../redux/store';

describe('RecipeList', () => {
    beforeEach(() => {
        act(() => {
            let initialState = {
                recipeListData: {
                    title: 'recipeTitle',
                    flavor_type: 'Sour',
                    id: 'recipeId',
                    author: '1',
                    photo_main: 'recipeImage',
                },
            };
            store.dispatch({ type: 'LOAD_RECIPE_LIST_ACTION', payload: initialState });
            render(
                <Provider store={store}>
                    <RecipeList />
                </Provider>
            );
        });
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
    // should dispatch loadRecipeListAction
});
