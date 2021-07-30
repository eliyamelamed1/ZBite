import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../pages/recipes/[RecipeDetails_Id]';
import configureStore from 'redux-mock-store';
import { getServerSideProps } from '../../../pages/recipes/[RecipeDetails_Id]';
import { loadRecipeDetailsAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';

const recipeParams = {
    existingRecipeId: '5',
    nonExistingRecipeId: 'nonExistingRecipe',
    searchedRecipeData: {
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

jest.mock('../../../redux/actions/recipe', () => ({ loadRecipeDetailsAction: jest.fn() }));
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        recipeReducer: {
            searchedRecipeData: recipeParams.searchedRecipeData,
        },
    })),
}));
const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('RecipeDetails - getServerSideProps', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should dispatch loadRecipeDetailsAction', async () => {
        await getServerSideProps(contextParams.existingRecipe);
        const timesActionDispatched = loadRecipeDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadRecipeDetailsAction.mock.calls[0][0].id).toBe(recipeParams.existingRecipeId);
    });
    test('getStaticProps - should return matching props', async () => {
        const props = (await getServerSideProps(contextParams.existingRecipe)).props;
        expect(props.searchedRecipeData).toEqual(recipeParams.searchedRecipeData);
    });
    test('getStaticProps - if recipe doesnt exist return not found', async () => {
        const notFound = (await getServerSideProps(contextParams.nonExistingRecipe)).notFound;
        expect(notFound).toEqual(true);
    });
});

describe('RecipeDetails - author of recipe', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: 'eliya' } },
        recipeReducer: {
            searchedRecipeData: {
                id: '5',
                title: 'recipeTitle',
                description: 'recipeDescription',
                flavor_type: 'Sour',
                author: 'eliya',
                photo_main: '/#',
            },
        },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { searchedRecipeData } = (await getServerSideProps(contextParams.existingRecipe)).props;
        render(
            <Provider store={store}>
                <RecipeDetails searchedRecipeData={searchedRecipeData} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
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
});
describe('RecipeDetails - not the recipe author', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: 'eilon' } },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { searchedRecipeData } = (await getServerSideProps(contextParams.existingRecipe)).props;
        render(
            <Provider store={store}>
                <RecipeDetails searchedRecipeData={searchedRecipeData} />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
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
