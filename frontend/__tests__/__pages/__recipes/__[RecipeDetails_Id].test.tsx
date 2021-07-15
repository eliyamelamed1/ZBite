import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../pages/recipes/[RecipeDetails_Id]';
import configureStore from 'redux-mock-store';
import { loadRecipeDetailsAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';

const dynamicIdParam = '5';

jest.mock('../../../redux/actions/recipe', () => ({ loadRecipeDetailsAction: jest.fn() }));
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        query: { RecipeDetails_Id: dynamicIdParam },
    })),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('RecipeDetails - author', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: 'eliya' } },
        recipeReducer: {
            recipeDetailData: {
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
    beforeEach(() => {
        render(
            <Provider store={store}>
                <RecipeDetails />
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
    test('should dispatch loadRecipeDetailsAction', () => {
        const timesActionDispatched = loadRecipeDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadRecipeDetailsAction.mock.calls[0][0].id).toBe(dynamicIdParam);
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
describe('RecipeDetails - not author', () => {
    let initialState = {
        authReducer: { loggedUserData: { id: 'eilon' } },
        recipeReducer: {
            recipeDetailData: {
                id: '5',
                title: 'recipeTitle',
                description: 'recipeDescription',
                flavor_type: 'Sour',
                author: 'eliya',
                photo_1: '/#',
            },
        },
    };
    let store = mockStore(initialState);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <RecipeDetails />
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
    test('should dispatch loadRecipeDetailsAction', () => {
        const timesActionDispatched = loadRecipeDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadRecipeDetailsAction.mock.calls[0][0].id).toBe(dynamicIdParam);
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

describe('RecipeDetails - Non-existing recipe ', () => {
    beforeEach(() => {
        let initialState = {
            recipeReducer: {},
        };
        let store = mockStore(initialState);
        render(
            <Provider store={store}>
                <RecipeDetails />
            </Provider>
        );
    });
    afterEach(() => {
        cleanup();
    });

    test('should render custom404', () => {
        const custom404TestId = screen.getByTestId('custom404');

        expect(custom404TestId).toBeInTheDocument();
    });
});
