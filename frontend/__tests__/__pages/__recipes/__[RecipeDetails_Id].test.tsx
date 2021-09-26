import '@testing-library/jest-dom/extend-expect';

import * as ReviewCreate from '../../../components/reviews/ReviewCreate';
import * as recipeActions from '../../../redux/actions/recipeActions';

import { TEST_CASE_AUTH, TEST_CASE_RECIPE } from '../../../redux/types';
import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeDetails from '../../../pages/recipes/[RecipeDetails_Id]';
import axios from 'axios';
import { getServerSideProps } from '../../../pages/recipes/[RecipeDetails_Id]';
import store from '../../../redux/store';

const loadRecipeDetailsActionSpy = jest.spyOn(recipeActions, 'loadRecipeDetailsAction');
const reviewsInRecipeActionSpy = jest.spyOn(recipeActions, 'reviewsInRecipeAction');
const ReviewCreateSpy = jest.spyOn(ReviewCreate, 'default');

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

const listOfReviews = [{ recipe: 'bacon', id: '1', author: 'eliya', stars: '5', comment: 'new comment' }];

describe('RecipeDetails - getServerSideProps', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        axios.get.mockReturnValueOnce({ data: recipeParams.recipeData });
        axios.post.mockReturnValueOnce({ data: 'reviews data' });
    });
    test('should dispatch loadRecipeDetailsAction', async () => {
        await getServerSideProps(contextParams.existingRecipe);
        const timesActionDispatched = loadRecipeDetailsActionSpy.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(loadRecipeDetailsActionSpy.mock.calls[0][0].id).toBe(recipeParams.existingRecipeId);
    });
    test('should dispatch reviewsInRecipeAction', async () => {
        await getServerSideProps(contextParams.existingRecipe);
        const timesActionDispatched = reviewsInRecipeActionSpy.mock.calls.length;

        expect(timesActionDispatched).toBe(1);
        expect(reviewsInRecipeActionSpy.mock.calls[0][0].recipeId).toBe(recipeParams.existingRecipeId);
    });
    test('should return matching props', async () => {
        const props = (await getServerSideProps(contextParams.existingRecipe)).props;
        expect(props.serverRecipeData).toEqual(recipeParams.recipeData);
        expect(props.serverReviewsData).toEqual('reviews data');
    });
    test('if recipe doesnt exist return not found', async () => {
        const notFound = (await getServerSideProps(contextParams.nonExistingRecipe)).notFound;
        expect(notFound).toEqual(true);
    });
});

describe('RecipeDetails - recipe of author', () => {
    const userInitialState = {
        loggedUserData: { id: 'eliya' },
        isUserAuthenticated: true,
    };
    const recipeInitialState = {
        requestedRecipeData: {
            id: '5',
            title: 'recipeTitle',
            description: 'recipeDescription',
            flavor_type: 'Sour',
            author: 'eliya',
            saves: [],
            photo_main: '/#',
        },
        listOfFilteredReviews: null,
    };

    let updatedRecipe = {
        id: '5',
        title: 'updatedRecipeTitle',
        description: 'updatedRecipeDescription',
        flavor_type: 'Sweet',
        author: 'eliya',
        saves: ['someUser'],
        photo_main: '/#',
    };
    beforeEach(async () => {
        jest.clearAllMocks();
        cleanup();

        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
        store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });

        const serverRecipeData = recipeParams.recipeData;
        const serverReviewsData = listOfReviews;
        render(
            <Provider store={store}>
                <RecipeDetails serverRecipeData={serverRecipeData} serverReviewsData={serverReviewsData} />
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
    test('should render ReviewCreate', () => {
        expect(ReviewCreateSpy).toHaveBeenCalled();
        expect(ReviewCreateSpy.mock.calls[0][0].recipeId).toBe(recipeParams.recipeData.id);
    });
    test('should display updated recipeData', async () => {
        // migrateRequestedRecipeData isUserDataMatchReqId === true
        const initialState = {
            requestedRecipeData: updatedRecipe,
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });
        const updatedTitle = await screen.findByText(updatedRecipe.title);
        const updatedDescription = await screen.findByText(updatedRecipe.description);
        const updatedFlavor = await screen.findAllByText(updatedRecipe.flavor_type);
        const updatedSaves = await screen.findByText(/saves: 1/);

        expect(updatedTitle).toBeInTheDocument();
        expect(updatedDescription).toBeInTheDocument();
        expect(updatedFlavor.length).toBe(2);
        expect(updatedFlavor[1]).toBeInTheDocument();
        expect(updatedSaves).toBeInTheDocument();
    });
    test('should not display updated recipe data of other recipe', async () => {
        updatedRecipe = {
            ...updatedRecipe,
            id: 'differentRecipeId',
        };
        const initialState = {
            requestedRecipeData: updatedRecipe,
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });
        const updatedTitle = await screen.queryByText(updatedRecipe.title);
        const updatedDescription = await screen.queryByText(updatedRecipe.description);
        const updatedFlavor = await screen.queryAllByText(updatedRecipe.flavor_type);

        expect(updatedTitle).not.toBeInTheDocument();
        expect(updatedDescription).not.toBeInTheDocument();
        expect(updatedFlavor.length).toBe(1);
    });
    test('should display updated reviewsData', async () => {
        // migrateListOfFilteredReviews isReviewsOfThisRecipe === true -
        const initialState = {
            listOfFilteredReviews: [
                { recipe: '5', id: '1', author: 'eliya', stars: 'updated stars', comment: 'updated comment' },
            ],
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });

        const updatedStars = await screen.findByText(/updated stars/i);
        expect(updatedStars).toBeInTheDocument();
    });
    test('should not display updated review data of other recipe', async () => {
        // migrateListOfFilteredReviews isReviewsOfThisRecipe === false
        const initialState = {
            listOfFilteredReviews: [
                { recipe: 'pizza', id: '1', author: 'eliya', stars: 'updated stars', comment: 'updated comment' },
            ],
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });

        const updatedStars = await screen.queryByText(/updated stars/i);
        expect(updatedStars).not.toBeInTheDocument();
    });
});

describe('RecipeDetails - not the recipe author', () => {
    const userInitialState = {
        loggedUserData: { id: 'eilon' },
        isUserAuthenticated: true,
    };
    const recipeInitialState = {
        requestedRecipeData: {
            id: '5',
            title: 'recipeTitle',
            description: 'recipeDescription',
            flavor_type: 'Sour',
            author: 'eliya',
            saves: [],
            photo_main: '/#',
        },
        listOfFilteredReviews: null,
    };
    beforeEach(async () => {
        cleanup();
        jest.clearAllMocks();

        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
        store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });

        const serverRecipeData = recipeParams.recipeData;
        const serverReviewsData = listOfReviews;

        render(
            <Provider store={store}>
                <RecipeDetails serverRecipeData={serverRecipeData} serverReviewsData={serverReviewsData} />
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
    test('should render ReviewCreate', () => {
        expect(ReviewCreateSpy).toHaveBeenCalled();
        expect(ReviewCreateSpy.mock.calls[0][0].recipeId).toBe(recipeParams.recipeData.id);
    });
    test('should display updated reviewsData', async () => {
        // migrateListOfFilteredReviews isReviewsOfThisRecipe === true
        const initialState = {
            listOfFilteredReviews: [
                { recipe: '5', id: '1', author: 'eliya', stars: 'updated stars', comment: 'updated comment' },
            ],
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });

        const updatedStars = await screen.findByText(/updated stars/i);
        expect(updatedStars).toBeInTheDocument();
    });
    test('should no display updated reviewsData of other recipe', async () => {
        // migrateListOfFilteredReviews isReviewsOfThisRecipe === false
        const initialState = {
            listOfFilteredReviews: [
                { recipe: 'pizza', id: '1', author: 'eliya', stars: 'updated stars', comment: 'updated comment' },
            ],
        };
        await store.dispatch({ type: TEST_CASE_RECIPE, payload: initialState });

        const updatedStars = await screen.queryByText(/updated stars/i);
        expect(updatedStars).not.toBeInTheDocument();
    });
});
describe('RecipeDetails - guest user', () => {
    const userInitialState = {
        isUserAuthenticated: null,
    };
    const recipeInitialState = {
        requestedRecipeData: {
            id: '5',
            title: 'recipeTitle',
            description: 'recipeDescription',
            flavor_type: 'Sour',
            author: 'eliya',
            photo_main: '/#',
        },
        listOfFilteredReviews: null,
    };
    beforeEach(async () => {
        cleanup();
        jest.clearAllMocks();

        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
        store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });

        const serverRecipeData = recipeParams.recipeData;
        const serverReviewsData = listOfReviews;

        render(
            <Provider store={store}>
                <RecipeDetails serverRecipeData={serverRecipeData} serverReviewsData={serverReviewsData} />
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
    test('should not render RecipeUpdate component', () => {
        const recipeUpdateTestId = screen.queryByTestId('recipeUpdate');

        expect(recipeUpdateTestId).not.toBeInTheDocument();
    });
    test('should not render ReviewCreate', () => {
        expect(ReviewCreateSpy).not.toHaveBeenCalled();
    });
});
