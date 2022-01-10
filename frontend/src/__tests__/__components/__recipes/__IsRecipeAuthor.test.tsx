import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import IsRecipeAuthor from '../../../components/recipes/IsRecipeAuthor';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

afterEach(() => {
    cleanup();
});
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('IsRecipeAuthor - author', () => {
    beforeEach(() => {
        let initialState = { userReducer: { loggedUserData: { id: 1 } } };
        let store = mockStore(initialState);
        const recipe = {
            title: 'recipeTitle',
            id: 'recipeId',
            author: { id: '1', name: 'authorName' },
            photo_main: 'recipeImage',
        };
        render(
            <Provider store={store}>
                <IsRecipeAuthor recipe={recipe} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should render RecipeUpdate', () => {
        const authorLinks = screen.getByTestId('recipeUpdate');
        expect(authorLinks).toBeInTheDocument();
    });
    test('should render RecipeDelete', () => {
        const authorLinks = screen.getByTestId('recipeDelete');
        expect(authorLinks).toBeInTheDocument();
    });
});

describe('IsRecipeAuthor - not author', () => {
    beforeEach(() => {
        let initialState = { userReducer: { loggedUserData: { id: 2 } } };
        let store = mockStore(initialState);
        const recipe = {
            title: 'recipeTitle',
            id: 'recipeId',
            author: { id: '1', name: 'authorName' },
            photo_main: 'recipeImage',
        };
        render(
            <Provider store={store}>
                <IsRecipeAuthor recipe={recipe} />
            </Provider>
        );
    });
    test('should render without crashing', () => {});
    test('should not render RecipeUpdate', () => {
        const authorLinks = screen.queryByTestId('recipeUpdate');
        expect(authorLinks).not.toBeInTheDocument();
    });
    test('should not render RecipeDelete', () => {
        const authorLinks = screen.queryByTestId('recipeDelete');
        expect(authorLinks).not.toBeInTheDocument();
    });
});
