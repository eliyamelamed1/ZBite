import '@testing-library/jest-dom/extend-expect';

import * as DisplayRecipes from '../../components/recipes/DisplayRecipes';
import * as RecipesActions from '../../redux/actions/recipeActions';

import HomePage, { getStaticProps } from '../../pages';
import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import { pageRoute } from '../../globals';
import store from '../../redux/store';
import userEvent from '@testing-library/user-event';

jest.mock('next/router');
jest.mock('../../redux/store.tsx');

const displayRecipesSpy = jest.spyOn(DisplayRecipes, 'default');
const loadFollowedRecipesActionSpy = jest.spyOn(RecipesActions, 'loadFollowedRecipesAction');
const loadTrendingRecipesActionSpy = jest.spyOn(RecipesActions, 'loadTrendingRecipesAction');

describe('home page', () => {
    let listOfTrendingRecipes = [
        {
            title: 'trending recipe',
            flavor_type: 'Sour',
            photo_main: '/recipe image #',
            id: 'trending recipe id',
            author: 'trending recipe author',
        },
        {
            title: 'trending recipe2',
            flavor_type: 'Sour',
            photo_main: '/recipe image #',
            id: 'trending recipe id2',
            author: 'trending recipe author',
        },
    ];
    let listOfFollowedRecipes = [
        {
            title: 'Followed recipe',
            flavor_type: 'Sour',
            photo_main: '/recipe image #',
            id: 'Followed recipe id',
            author: 'Followed recipe author',
        },
        {
            title: 'Followed recipe2',
            flavor_type: 'Sour',
            photo_main: '/recipe image #',
            id: 'Followed recipe id2',
            author: 'Followed recipe author',
        },
    ];

    describe('getStaticProps', () => {
        beforeEach(async () => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                recipeReducer: {
                    listOfTrendingRecipes: listOfTrendingRecipes,
                },
            });
        });

        test('getStaticProps should dispatch loadTrendingRecipesAction', async () => {
            (await getStaticProps()).props.listOfTrendingRecipes;
            expect(loadTrendingRecipesActionSpy).toHaveBeenCalled();
        });
        test('getStaticProps - should return matching revalidate', async () => {
            const revalidate = (await getStaticProps()).revalidate;
            expect(revalidate).toBe(10);
        });
        test('getStaticProps - should return matching props', async () => {
            const props = (await getStaticProps()).props;
            expect(props.listOfTrendingRecipes).toEqual(listOfTrendingRecipes);
        });
    });

    describe('logged accounts', () => {
        beforeEach(async () => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: { isUserAuthenticated: true },
                recipeReducer: {
                    listOfTrendingRecipes: listOfTrendingRecipes,
                    listOfFollowedRecipes: listOfFollowedRecipes,
                },
            });

            render(
                <Provider store={store}>
                    <HomePage listOfTrendingRecipes={listOfTrendingRecipes} />
                </Provider>
            );
        });
        test('should render successfully', () => {});

        test('should render trending recipes', () => {
            expect(displayRecipesSpy).toHaveBeenCalled();
            expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfTrendingRecipes }, {});
        });

        test('clicking the following button should dispatch', () => {
            const followingButton = screen.getByRole('button', { name: 'Following' });
            userEvent.click(followingButton);

            expect(loadFollowedRecipesActionSpy.mock.calls.length).toBe(1);
        });

        test('clicking the following button should display followed recipes', async () => {
            const followingButton = screen.getByRole('button', { name: 'Following' });
            userEvent.click(followingButton);

            await expect(displayRecipesSpy).toHaveBeenCalled();
            expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfFollowedRecipes }, {});
        });
        test('clicking trending button after the following button should display trending recipes', async () => {
            const followingButton = screen.getByRole('button', { name: 'Following' });
            await userEvent.click(followingButton);

            const trendingButton = screen.getByRole('button', { name: 'Trending' });
            await userEvent.click(trendingButton);

            expect(displayRecipesSpy).toHaveBeenCalled();
            expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfTrendingRecipes }, {});
        });
    });
    describe('guest accounts', () => {
        beforeEach(async () => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: { isUserAuthenticated: false },
                recipeReducer: {
                    listOfTrendingRecipes: listOfTrendingRecipes,
                    listOfFollowedRecipes: listOfFollowedRecipes,
                },
            });

            render(
                <Provider store={store}>
                    <HomePage listOfTrendingRecipes={listOfTrendingRecipes} />
                </Provider>
            );
        });
        test('should render successfully', () => {});
        test('should render trending recipes', () => {
            expect(displayRecipesSpy).toHaveBeenCalled();
            expect(displayRecipesSpy).toHaveBeenCalledWith({ recipesToDisplay: listOfTrendingRecipes }, {});
        });
        test('clicking the following button should redirect to login page', () => {
            const followingButton = screen.getByRole('button', { name: 'Following' });
            userEvent.click(followingButton);

            expect(Router.push.mock.calls.length).toBe(1);
            expect(Router.push.mock.calls[0][0]).toBe(pageRoute().login);
        });
    });
});
