import '@testing-library/jest-dom/extend-expect';

import * as reactRedux from 'react-redux';
import * as recipeActions from '../../../redux/actions/recipeActions';

import { TEST_CASE_AUTH, TEST_CASE_RECIPE } from '../../../redux/types';
import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../pages/recipes/[RecipeDetails_Id]';
import axios from 'axios';
import { createTestStore } from '../../../redux/store';
import { getServerSideProps } from '../../../pages/recipes/[RecipeDetails_Id]';

const loadRecipeDetailsActionSpy = jest.spyOn(recipeActions, 'loadRecipeDetailsAction');

const recipeParams = {
    existingRecipeId: '5',
    nonExistingRecipeId: 'nonExistingRecipe',
    recipeData: {
        id: '5',
        title: 'recipeTitle',
        description: 'recipeDescription',
        flavor_type: 'Sour',
        author: 'eliya',
        photo_main: '/#',
    },
};
const contextParams = {
    existingRecipe: {
        params: { RecipeDetails_Id: recipeParams.existingRecipeId },
    },
    nonExistingRecipe: {
        params: { RecipeDetails_Id: recipeParams.nonExistingRecipeId },
    },
};

jest.mock('axios');
axios.get.mockReturnValue({ data: recipeParams.recipeData });

describe('RecipeDetails', () => {
    describe('RecipeDetails - getServerSideProps', () => {
        afterEach(() => {
            cleanup();
            jest.clearAllMocks();
        });
        test('should dispatch loadRecipeDetailsAction', async () => {
            await getServerSideProps(contextParams.existingRecipe);
            const timesActionDispatched = loadRecipeDetailsActionSpy.mock.calls.length;

            expect(timesActionDispatched).toBe(1);
            expect(loadRecipeDetailsActionSpy.mock.calls[0][0].id).toBe(recipeParams.existingRecipeId);
        });
        test('getStaticProps - should return matching props', async () => {
            const props = (await getServerSideProps(contextParams.existingRecipe)).props;
            expect(props.serverRecipeData).toEqual(recipeParams.recipeData);
        });
        test('getStaticProps - if recipe doesnt exist return not found', async () => {
            const notFound = (await getServerSideProps(contextParams.nonExistingRecipe)).notFound;
            expect(notFound).toEqual(true);
        });
    });

    describe('RecipeDetails - author of recipe', () => {
        const store = createTestStore();
        let userInitialState = {
            loggedUserData: { id: 'eliya' },
            isUserAuthenticated: true,
        };
        let recipeInitialState = {
            requestedRecipeData: {
                id: '5',
                title: 'recipeTitle',
                description: 'recipeDescription',
                flavor_type: 'Sour',
                author: 'eliya',
                photo_main: '/#',
            },
        };
        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
        store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });

        beforeEach(async () => {
            cleanup();
            jest.clearAllMocks();

            const { serverRecipeData } = (await getServerSideProps(contextParams.existingRecipe)).props;
            render(
                <Provider store={store}>
                    <RecipeDetails serverRecipeData={serverRecipeData} />
                </Provider>
            );
        });

        test('should render without crashing', () => {});
        test('should render match own data-testid', () => {
            const recipeDetailsTestId = screen.getByTestId('recipeDetails');
            expect(recipeDetailsTestId).toBeInTheDocument();
        });
        test('should render the recipe details ', () => {
            const recipeTitle = screen.getByText(/recipeTitle/i);
            const recipeDescription = screen.getByText(/recipeDescription/i);

            expect(recipeTitle).toBeInTheDocument();
            expect(recipeDescription).toBeInTheDocument();
        });
        test('should render authorLinks', () => {
            const authorLinks = screen.getByTestId('authorLinks');

            expect(authorLinks).toBeInTheDocument();
        });
        test('authorLinks should contain IsRecipeAuthor component', () => {
            const isRecipeAuthorTestId = screen.getByTestId('isRecipeAuthor');

            expect(isRecipeAuthorTestId).toBeInTheDocument();
        });
        test('IsRecipeAuthor should render RecipeUpdate component', () => {
            const recipeUpdateTestId = screen.getByTestId('recipeUpdate');

            expect(recipeUpdateTestId).toBeInTheDocument();
        });
        test('after updating recipe data should display the new data', () => {});
    });
});

describe('RecipeDetails - not the recipe author', () => {
    const store = createTestStore();
    let userInitialState = {
        loggedUserData: { id: 'eilon' },
        isUserAuthenticated: true,
    };
    store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });

    beforeEach(async () => {
        cleanup();
        jest.clearAllMocks();

        const { serverRecipeData } = (await getServerSideProps(contextParams.existingRecipe)).props;
        render(
            <Provider store={store}>
                <RecipeDetails serverRecipeData={serverRecipeData} />
            </Provider>
        );
    });

    test('should render without crashing', () => {});
    test('should render match own data-testid', () => {
        const recipeDetailsTestId = screen.getByTestId('recipeDetails');
        expect(recipeDetailsTestId).toBeInTheDocument();
    });

    test('should render the recipe details ', () => {
        const recipeTitle = screen.getByText(/recipeTitle/i);
        const recipeDescription = screen.getByText(/recipeDescription/i);

        expect(recipeTitle).toBeInTheDocument();
        expect(recipeDescription).toBeInTheDocument();
    });
    test('should render guestLinks', () => {
        const guestLinks = screen.getByTestId('guestLinks');
        expect(guestLinks).toBeInTheDocument();
    });
    test('authorLinks should contain IsRecipeAuthor component', () => {
        const isRecipeAuthorTestId = screen.getByTestId('isRecipeAuthor');
        expect(isRecipeAuthorTestId).toBeInTheDocument();
    });
    test('IsRecipeAuthor should not render RecipeUpdate component', () => {
        const recipeUpdateTestId = screen.queryByTestId('recipeUpdate');

        expect(recipeUpdateTestId).not.toBeInTheDocument();
    });
});
