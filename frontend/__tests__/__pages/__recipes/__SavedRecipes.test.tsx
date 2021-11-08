import '@testing-library/jest-dom/extend-expect';

import * as DisplayRecipes from '../../../components/recipes/DisplayRecipes';
import * as RecipesActions from '../../../redux/actions/recipeActions';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import SavedRecipes from '../../../pages/recipes/SavedRecipes';
import { pageRoute } from '../../../globals';
import store from '../../../redux/store';

jest.mock('next/router');
jest.mock('../../../redux/store.tsx');

const displayRecipesSpy = jest.spyOn(DisplayRecipes, 'default');
const loadSavedRecipesActionSpy = jest.spyOn(RecipesActions, 'loadSavedRecipesAction');

describe('SavedRecipes', () => {
    let listOfSavedRecipes = [
        {
            title: 'trending recipe',
            photo_main: '/recipe image #',
            id: 'trending recipe id',
            author: { name: 'trending recipe author', id: 'id123' },
            saves: [],
            stars: 5.0,
        },
        {
            title: 'trending recipe2',
            photo_main: '/recipe image #',
            id: 'trending recipe id2',
            author: { name: 'trending recipe author', id: 'id123' },
            saves: [],
            stars: 5.0,
        },
    ];
    describe('logged users', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: { isUserAuthenticated: true },
                recipeReducer: {
                    listOfSavedRecipes: listOfSavedRecipes,
                },
            });

            render(
                <Provider store={store}>
                    <SavedRecipes />
                </Provider>
            );
        });
        test('should render successfully', () => {});
        test('should dispatch loadSavedRecipeAction', () => {
            expect(loadSavedRecipesActionSpy).toHaveBeenCalled();
        });
        test('should render Display Recipes', () => {
            expect(displayRecipesSpy).toHaveBeenCalled();
            expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfSavedRecipes }, {});
        });
    });
    describe('guest users', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: { isUserAuthenticated: false },
                recipeReducer: {
                    listOfSavedRecipes: listOfSavedRecipes,
                },
            });

            render(
                <Provider store={store}>
                    <SavedRecipes />
                </Provider>
            );
        });
        test('should render successfully', () => {});
        test('should redirect to login page', () => {
            expect(Router.push.mock.calls.length).toBeGreaterThanOrEqual(1);
            expect(Router.push.mock.calls[0][0]).toEqual(pageRoute().login);
        });
    });
});
