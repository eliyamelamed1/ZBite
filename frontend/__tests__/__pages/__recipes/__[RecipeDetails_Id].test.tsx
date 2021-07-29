import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../pages/recipes/[RecipeDetails_Id]';
import configureStore from 'redux-mock-store';
import { getServerSideProps } from '../../../pages/recipes/[RecipeDetails_Id]';
import { loadRecipeDetailsAction } from '../../../redux/actions/recipe';
import thunk from 'redux-thunk';

const recipeValues = {
    existingRecipeId: '5',
    nonExistingRecipeId: 'nonExistingRecipe',
    recipeDetails: {
        id: '5',
        title: 'recipeTitle',
        description: 'recipeDescription',
        flavor_type: 'Sour',
        author: 'eliya',
        photo_main: '/#',
    },
};
const contextValues = {
    existingRecipeContext: {
        params: { RecipeDetails_Id: recipeValues.existingRecipeId },
    },
    nonExistingRecipeContext: {
        params: { RecipeDetails_Id: recipeValues.nonExistingRecipeId },
    },
};

jest.mock('../../../redux/actions/recipe', () => ({ loadRecipeDetailsAction: jest.fn() }));
jest.mock('../../../redux/store.tsx', () => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
        recipeReducer: {
            recipeDetails: recipeValues.recipeDetails,
        },
    })),
}));
const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('RecipeDetails - getServerSideProps', () => {
    beforeEach(async () => {
        await getServerSideProps(contextValues.existingRecipeContext);
    });
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('should dispatch loadRecipeDetailsAction', () => {
        const timesActionDispatched = loadRecipeDetailsAction.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadRecipeDetailsAction.mock.calls[0][0].id).toBe(recipeValues.existingRecipeId);
    });
    test('getStaticProps - should return matching props', async () => {
        const props = (await getServerSideProps(contextValues.existingRecipeContext)).props;
        expect(props.recipeDetails).toEqual(recipeValues.recipeDetails);
    });
    test('getStaticProps - should return matching props', async () => {
        const notFound = (await getServerSideProps(contextValues.nonExistingRecipeContext)).notFound;
        expect(notFound).toEqual(true);
    });
});

describe('RecipeDetails - author of recipe', () => {
    let initialState = {
        authReducer: { loggedUserDetails: { id: 'eliya' } },
        recipeReducer: {
            recipeDetails: {
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
        const { recipeDetails } = (await getServerSideProps(contextValues.existingRecipeContext)).props;
        render(
            <Provider store={store}>
                <RecipeDetails recipeDetails={recipeDetails} />
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
        authReducer: { loggedUserDetails: { id: 'eilon' } },
    };
    let store = mockStore(initialState);
    beforeEach(async () => {
        const { recipeDetails } = (await getServerSideProps(contextValues.existingRecipeContext)).props;
        render(
            <Provider store={store}>
                <RecipeDetails recipeDetails={recipeDetails} />
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
